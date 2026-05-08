const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const NOTIFY_EMAIL = 'almaznayaspina@gmail.com';
const TELEGRAM_GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';

const ALLOWED_SOURCES = new Set(['vdnh_landing', 'turgenevskaya_landing', 'parks_landing']);
const PHONE_REGEX = /^[0-9]{10,11}$/;

const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// Naive in-memory rate limiter (per warm instance) — limits abuse bursts.
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW_MS = 60_000; // per minute per IP

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('cf-connecting-ip') ||
      'unknown';
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawPhone = (body as { phone?: unknown })?.phone;
    const rawSource = (body as { source?: unknown })?.source;
    const rawPark = (body as { park?: unknown })?.park;
    const rawFormat = (body as { format?: unknown })?.format;
    const utm = {
      utm_source: (body as any)?.utm_source,
      utm_medium: (body as any)?.utm_medium,
      utm_campaign: (body as any)?.utm_campaign,
      utm_content: (body as any)?.utm_content,
      utm_term: (body as any)?.utm_term,
    };

    if (typeof rawPhone !== 'string' || !PHONE_REGEX.test(rawPhone)) {
      return new Response(JSON.stringify({ error: 'Invalid phone format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const phone = rawPhone;

    const source =
      typeof rawSource === 'string' && ALLOWED_SOURCES.has(rawSource)
        ? rawSource
        : 'parks_landing';

    const safePhone = escapeHtml(phone);
    const safeSource = escapeHtml(source);
    const safePark = typeof rawPark === 'string' ? escapeHtml(rawPark.slice(0, 100)) : '';
    const safeFormat = typeof rawFormat === 'string' ? escapeHtml(rawFormat.slice(0, 50)) : '';
    const utmLines = Object.entries(utm)
      .filter(([, v]) => typeof v === 'string' && v)
      .map(([k, v]) => `${k}: ${escapeHtml(String(v).slice(0, 200))}`)
      .join('\n');

    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
    const safeNow = escapeHtml(now);
    const results: Record<string, string> = {};

    // Email via Resend
    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (resendKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'Йога в парках <onboarding@resend.dev>',
            to: [NOTIFY_EMAIL],
            subject: 'Новая заявка: йога в парке',
            html: `
              <h2>Новая заявка с лендинга</h2>
              <p><strong>Телефон:</strong> ${safePhone}</p>
              ${safePark ? `<p><strong>Парк:</strong> ${safePark}</p>` : ''}
              ${safeFormat ? `<p><strong>Формат:</strong> ${safeFormat}</p>` : ''}
              <p><strong>Источник:</strong> ${safeSource}</p>
              ${utmLines ? `<pre style="background:#f5f5f5;padding:8px;border-radius:6px">${escapeHtml(utmLines)}</pre>` : ''}
              <p><strong>Дата и время:</strong> ${safeNow}</p>
            `,
          }),
        });
        results.email = 'sent';
      } catch (e) {
        console.error('Resend error:', e);
        results.email = 'failed';
      }
    }

    // Telegram notification
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    const telegramApiKey = Deno.env.get('TELEGRAM_API_KEY');
    const telegramChatId = Deno.env.get('TELEGRAM_CHAT_ID');

    if (lovableApiKey && telegramApiKey && telegramChatId) {
      try {
        const parkLine = safePark ? `\n🌳 Парк: ${safePark}` : '';
        const formatLine = safeFormat ? `\n🧘 Формат: ${safeFormat}` : '';
        const utmBlock = utmLines ? `\n\n${utmLines}` : '';
        const text = `📋 Новая заявка: йога в парке\n\n📱 Телефон: ${safePhone}${parkLine}${formatLine}\n📌 Источник: ${safeSource}${utmBlock}\n🕐 ${safeNow}`;
        const tgResponse = await fetch(`${TELEGRAM_GATEWAY_URL}/sendMessage`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lovableApiKey}`,
            'X-Connection-Api-Key': telegramApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text,
            parse_mode: 'HTML',
          }),
        });
        const tgData = await tgResponse.json();
        if (!tgResponse.ok) {
          console.error('Telegram error:', JSON.stringify(tgData));
          results.telegram = 'failed';
        } else {
          results.telegram = 'sent';
        }
      } catch (e) {
        console.error('Telegram error:', e);
        results.telegram = 'failed';
      }
    }

    return new Response(JSON.stringify({ ok: true, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('notify-lead error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

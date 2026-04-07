const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const NOTIFY_EMAIL = 'almaznayaspina@gmail.com';
const TELEGRAM_GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { phone, source } = await req.json();

    if (!phone || typeof phone !== 'string') {
      return new Response(JSON.stringify({ error: 'phone is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
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
            from: 'Йога ВДНХ <onboarding@resend.dev>',
            to: [NOTIFY_EMAIL],
            subject: 'Новая заявка: йога ВДНХ',
            html: `
              <h2>Новая заявка с лендинга</h2>
              <p><strong>Телефон:</strong> ${phone}</p>
              <p><strong>Источник:</strong> ${source || 'vdnh_landing'}</p>
              <p><strong>Дата и время:</strong> ${now}</p>
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
        const text = `📋 Новая заявка: йога ВДНХ\n\n📱 Телефон: ${phone}\n📌 Источник: ${source || 'vdnh_landing'}\n🕐 ${now}`;
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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

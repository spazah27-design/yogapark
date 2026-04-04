const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const NOTIFY_EMAIL = 'almaznayaspina@gmail.com';

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

    // Try sending email via Resend if API key is available
    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (resendKey) {
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
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TELEGRAM_GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
  if (!lovableApiKey) {
    return new Response(JSON.stringify({ error: 'LOVABLE_API_KEY not set' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  const telegramApiKey = Deno.env.get('TELEGRAM_API_KEY');
  if (!telegramApiKey) {
    return new Response(JSON.stringify({ error: 'TELEGRAM_API_KEY not set' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const response = await fetch(`${TELEGRAM_GATEWAY_URL}/getUpdates`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${lovableApiKey}`,
      'X-Connection-Api-Key': telegramApiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ limit: 5 }),
  });

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});

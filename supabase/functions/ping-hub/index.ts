import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  // Trata requisições preflight do CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    // Captura o registro inserido/atualizado na tabela 'articles'
    const record = payload.record;

    // Só dispara se o artigo estiver publicado
    if (record && record.published === true) {
      const hubUrl = "https://pubsubhubbub.appspot.com/";
      const topicUrl = "https://vozdaia.com/feed.xml";

      // Monta os parâmetros no formato application/x-www-form-urlencoded exigido pelo Google Hub
      const formData = new URLSearchParams();
      formData.append("hub.mode", "publish");
      formData.append("hub.url", topicUrl);

      console.log(`Disparando ping PubSubHubbub para o Google. Artigo: "${record.title}"`);

      const response = await fetch(hubUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Falha no Google Hub (${response.status}): ${errorText}`);
      }

      console.log("Ping enviado com sucesso ao PubSubHubbub do Google!");

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Google Hub notificado com sucesso!", 
          article: record.title 
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" }, 
          status: 200 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Artigo não publicado (rascunho) ou sem registro. Ping ignorado." 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 200 
      }
    );

  } catch (error: any) {
    console.error("Erro na execução da Edge Function:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 400 
      }
    );
  }
});

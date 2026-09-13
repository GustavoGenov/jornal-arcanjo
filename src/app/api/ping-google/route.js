import { NextResponse } from 'next/server';

export async function POST(request) {
  return handlePing();
}

export async function GET(request) {
  return handlePing();
}

async function handlePing() {
  try {
    const hubUrl = 'https://pubsubhubbub.appspot.com/';
    const feedUrl = 'https://vozdaia.com/feed.xml';

    const params = new URLSearchParams();
    params.append('hub.mode', 'publish');
    params.append('hub.url', feedUrl);

    console.log('Disparando ping PubSubHubbub para o Google Notícias...');

    const response = await fetch(hubUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const isOk = response.ok;
    const resText = await response.text();

    return NextResponse.json({ 
      success: isOk, 
      message: isOk ? 'Ping para Google Notícias (PubSubHubbub) enviado com sucesso!' : 'Falha no ping',
      details: resText 
    }, { status: isOk ? 200 : 502 });

  } catch (err) {
    console.error('Erro no ping Google:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  const endpoint = '/api/automative-page?populate=*';
  const fullUrl = `${apiUrl}${endpoint}`;
  
  try {
    console.log('[Automotive API] Fazendo requisição para:', fullUrl);
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.NEXT_PUBLIC_STRAPI_API_TOKEN && {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        })
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Automotive API] Erro na resposta da API:', errorText);
      return NextResponse.json(
        { error: 'Erro ao buscar dados do Strapi', details: errorText },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    console.log('[Automotive API] Resposta da API recebida com sucesso');
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('[Automotive API] Erro ao buscar dados do Strapi:', error);
    return NextResponse.json(
      { error: 'Erro ao conectar ao Strapi', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  }
}

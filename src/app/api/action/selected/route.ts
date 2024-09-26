import { headers } from 'next/headers'

import  chess from '@/core/chess';
import { NextRequest } from 'next/server';


export async function PUT(request: NextRequest) {
  const itemId = await request.text();
  const newItem = chess.selected(itemId)
  const headersList = headers();
  const referer = headersList.get('referer');

  return new Response(JSON.stringify(newItem), {
    status: 200,
    headers: { referer: referer || '' },
  })
}

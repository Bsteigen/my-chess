import { headers } from 'next/headers'

import  chess from '@/core/chess';
import { NextRequest } from 'next/server';


export async function PUT(request: NextRequest) {
  const params = await request.json();
  const item = chess.findOneById(params.currentId);
  const cp = chess.findOneByCoordinate(params.target);
  item?.moveByCoordinate(params.target);
  chess.resetChecked();
  chess.delete(cp?.id);
  chess.changeCamp();
  const headersList = headers();
  const referer = headersList.get('referer');

  return new Response('ok', {
    status: 200,
    headers: { referer: referer || '' },
  })
}

import { headers } from 'next/headers'

import  chess from '@/core/chess';


export async function PUT() {
  chess.init()
  const headersList = headers();
  const referer = headersList.get('referer');

  return new Response('ok', {
    status: 200,
    headers: { referer: referer || '' },
  })
}

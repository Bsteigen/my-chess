import { headers } from 'next/headers'

import  chess from '@/core/chess';

export async function GET() {
  const headersList = headers();
  const referer = headersList.get('referer');

  return new Response(chess.getCamp(), {
    status: 200,
    headers: { referer: referer || '' },
  })
}


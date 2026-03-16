import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // CORS 설정
  response.setHeader('Access-Control-Allow-Credentials', true)
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (request.method === 'OPTIONS') {
    response.status(200).end()
    return
  }

  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const pw = request.query.pw;
    if (pw === "7739") {
        await kv.del('scores'); // 점수 초기화
        return response.status(200).json({ status: "cleared" });
    }
    return response.status(200).json({ status: "error" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Failed to reset scores' });
  }
}

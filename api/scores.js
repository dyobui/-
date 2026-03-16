import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  // CORS 설정 (모든 도메인 허용 - 교육용)
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
    // Vercel KV에서 'scores' 키로 저장된 배열 가져오기 (없으면 빈 배열)
    const scores = await kv.get('scores') || [];
    
    // 점수순 정렬 후 시간순 정렬
    scores.sort((a, b) => {
        if (b.total_score !== a.total_score) {
            return b.total_score - a.total_score;
        }
        return a.elapsed_sec - b.elapsed_sec;
    });

    return response.status(200).json(scores);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Failed to fetch scores' });
  }
}

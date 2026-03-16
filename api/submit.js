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

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = request.body;
    
    // 점수 계산 (server.py 로직과 동일)
    const total_q = parseInt(data.total) || 20;
    const elapsed_sec = parseFloat(data.elapsed_sec) || 9999;
    const correct = parseInt(data.correct) || 0;
    const name = data.name || "Unknown";

    // 1. 정확도 점수 (70점 만점)
    let accuracy_score = Math.round((correct / Math.max(total_q, 1) * 70) * 10) / 10;

    // 2. 속도 점수 (30점 만점)
    // 3분(180초) 이내 = 30점
    // 3분 경과 후 5초마다 1점 감점 (최저 0점)
    const MIN_SEC = 180;
    let speed_score = 0.0;
    
    if (elapsed_sec <= MIN_SEC) {
        speed_score = 30.0;
    } else {
        const overtime = elapsed_sec - MIN_SEC;
        const penalty_points = Math.floor(overtime / 5);
        speed_score = Math.max(0.0, 30.0 - penalty_points);
    }

    const total_score = Math.round((accuracy_score + speed_score) * 10) / 10;

    // 분:초 표시
    const m = Math.floor(elapsed_sec / 60);
    const s = Math.floor(elapsed_sec % 60);
    const time_str = `${m}분 ${s.toString().padStart(2, '0')}초`;

    const record = {
        name: name,
        correct: correct,
        total: total_q,
        accuracy_pct: Math.round((correct / Math.max(total_q, 1) * 100) * 10) / 10,
        accuracy_score: accuracy_score,
        speed_score: speed_score,
        total_score: total_score,
        elapsed_sec: elapsed_sec,
        time_str: time_str,
        timestamp: new Date().toISOString()
    };

    // Vercel KV에서 기존 배열 가져오기
    let scores = await kv.get('scores') || [];
    
    // 같은 이름 있으면 더 높은 점수로 갱신
    const existingIndex = scores.findIndex(s => s.name === name);
    if (existingIndex >= 0) {
        const existing = scores[existingIndex];
        if (total_score > existing.total_score || (total_score === existing.total_score && elapsed_sec < existing.elapsed_sec)) {
            scores[existingIndex] = record;
        }
    } else {
        scores.push(record);
    }

    // 정렬 (총점 내림차순, 시간 오름차순)
    scores.sort((a, b) => {
        if (b.total_score !== a.total_score) {
            return b.total_score - a.total_score;
        }
        return a.elapsed_sec - b.elapsed_sec;
    });

    // Vercel KV에 업데이트된 배열 저장
    await kv.set('scores', scores);

    return response.status(200).json({ ok: true, score: total_score });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Failed to submit score' });
  }
}

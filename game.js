// =============================================
// 서양미술사 방탈출 게임 - 게임 로직 (리더보드 버전)
// =============================================

// ── 전역 상태 ──
let currentRoomIndex = 0;
let currentQuizIndex = 0;
let quizAllDone = false;

// ── 플레이어 정보 & 점수 추적 ──
let playerName    = '';
let gameStartTime = null;
let timerInterval = null;
let totalCorrect  = 0;
let totalAnswered = 0;
const TOTAL_QUESTIONS = 20; // 4방 × 5문제

// ── DOM 참조 ──
const screens = {
  name:   document.getElementById('screen-name'),
  intro:  document.getElementById('screen-intro'),
  room:   document.getElementById('screen-room'),
  ending: document.getElementById('screen-ending')
};

// ── 화면 전환 ──
function showScreen(name) {
  Object.values(screens).forEach(s => { if(s) s.classList.remove('active', 'fade-in'); });
  const target = screens[name];
  if (!target) return;
  target.classList.add('active');
  requestAnimationFrame(() => target.classList.add('fade-in'));
}

// ─────────────────────────────────────────
// 이름 입력 화면
// ─────────────────────────────────────────
document.getElementById('btn-enter-name').addEventListener('click', enterName);
document.getElementById('player-name-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') enterName();
});

async function enterName() {
  const input = document.getElementById('player-name-input');
  const errEl = document.getElementById('name-error');
  const btn   = document.getElementById('btn-enter-name');
  const name  = input.value.trim();
  if (!name) {
    errEl.textContent = '⚠️ 이름을 입력해주세요!';
    input.focus();
    return;
  }
  
  // 서버에 요청하여 이미 있는 이름인지 체크
  if (btn) btn.disabled = true;
  if (btn) btn.textContent = '⏳ 확인 중...';
  
  try {
    const res = await fetch('/api/scores');
    if (res.ok) {
      const scores = await res.json();
      const isExist = scores.some(s => s.name === name);
      if (isExist) {
        errEl.textContent = '⚠️ 이미 사용 중인 이름입니다. 다른 이름을 입력해주세요!';
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '🚪 &nbsp;탈출 시작!';
        }
        input.focus();
        return;
      }
    }
  } catch (err) {
    console.warn('중복 체크 실패:', err);
  }
  
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '🚪 &nbsp;탈출 시작!';
  }

  playerName = name;
  // 인트로 인사말 업데이트
  const greet = document.getElementById('intro-player-greeting');
  if (greet) greet.textContent = `반갑습니다, ${playerName}님!`;
  showScreen('intro');
}

// ─────────────────────────────────────────
// 인트로 화면
// ─────────────────────────────────────────
function renderIntro() {
  document.getElementById('intro-story').textContent = ROOMS[0].story;
}

document.getElementById('btn-start').addEventListener('click', () => {
  currentRoomIndex = 0;
  totalCorrect  = 0;
  totalAnswered = 0;
  startTimer();
  playDoorTransition('🏛️ 박물관 입장', () => {
    renderRoom(currentRoomIndex);
    showScreen('room');
  });
});

// ─────────────────────────────────────────
// 타이머
// ─────────────────────────────────────────
function startTimer() {
  gameStartTime = Date.now();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateTimerDisplay, 1000);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

function getElapsedSec() {
  if (!gameStartTime) return 0;
  return Math.floor((Date.now() - gameStartTime) / 1000);
}

function updateTimerDisplay() {
  const sec = getElapsedSec();
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  const el = document.getElementById('game-timer');
  if (el) el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// ─────────────────────────────────────────
// 팝업
// ─────────────────────────────────────────
const popupOverlay = document.getElementById('popup-overlay');
const popupTitle   = document.getElementById('popup-title');
const popupContent = document.getElementById('popup-content');

function openPopup(title, contentHtml, isHint = false) {
  popupTitle.innerHTML = title;
  popupContent.innerHTML = contentHtml;
  const box = popupOverlay.querySelector('.popup-box');
  isHint ? box.classList.add('hint-popup') : box.classList.remove('hint-popup');
  popupOverlay.classList.add('open');
}
function closePopup() { popupOverlay.classList.remove('open'); }

document.getElementById('popup-close').addEventListener('click', closePopup);
popupOverlay.addEventListener('click', e => { if (e.target === popupOverlay) closePopup(); });

// ─────────────────────────────────────────
// 방 전환 효과
// ─────────────────────────────────────────
const doorTransition = document.getElementById('door-transition');
const doorText       = document.getElementById('door-text');

function playDoorTransition(message, callback) {
  doorText.textContent = message;
  doorTransition.classList.add('active');
  setTimeout(() => {
    callback();
    setTimeout(() => doorTransition.classList.remove('active'), 600);
  }, 700);
}

// ══════════════════════════════════════════
// 방 렌더링
// ══════════════════════════════════════════
function renderRoom(index) {
  const room = ROOMS[index + 1];
  currentQuizIndex = 0;
  quizAllDone = false;

  const scene = document.getElementById('room-scene');
  scene.className = 'room-scene theme-' + room.theme;

  let bg = document.getElementById('room-scene-bg');
  if (!bg) {
    bg = document.createElement('div');
    bg.id = 'room-scene-bg';
    bg.className = 'room-scene-bg';
    scene.prepend(bg);
  }

  document.getElementById('room-badge').textContent = `전시실 ${room.number} / 4`;
  document.getElementById('room-title-hud').textContent = room.title;

  const dotsWrap = document.getElementById('progress-dots');
  dotsWrap.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const dot = document.createElement('div');
    dot.className = 'progress-dot' +
      (i < index ? ' done' : i === index ? ' current' : '');
    dotsWrap.appendChild(dot);
  }

  renderRoomArtworks(scene, room);
  renderHotspots(scene, room);

  let eraLabel = scene.querySelector('.room-era-label');
  if (!eraLabel) {
    eraLabel = document.createElement('div');
    eraLabel.className = 'room-era-label';
    scene.appendChild(eraLabel);
  }
  eraLabel.textContent = room.era;

  renderSidebar(room);
}

// 방 그림 장식
function renderRoomArtworks(scene, room) {
  scene.querySelectorAll('.artwork-frame').forEach(el => el.remove());
  const artworkSets = {
    ancient:       ['🏺', '✝️', '🏛️', '📜'],
    renaissance:   ['🎨', '🖼️', '✏️', '📐'],
    baroque:       ['👑', '🕯️', '🥀', '🎭'],
    impressionism: ['🌸', '☀️', '🌊', '🎠']
  };
  const colors = {
    ancient: '#8b6914', renaissance: '#4a3080',
    baroque: '#6b1a1a', impressionism: '#1a4a6b'
  };
  const emojis = artworkSets[room.theme] || artworkSets.ancient;
  const color  = colors[room.theme] || colors.ancient;
  const positions = [
    { left: '5%',  top: '10%', w: 80, h: 100 },
    { left: '5%',  top: '55%', w: 80, h: 90  },
    { right: '5%', top: '10%', w: 80, h: 100 },
    { right: '5%', top: '60%', w: 75, h: 85  }
  ];
  emojis.slice(0, 4).forEach((emoji, i) => {
    const frame = document.createElement('div');
    frame.className = 'artwork-frame';
    frame.style.cssText = `
      ${positions[i].left ? 'left:' + positions[i].left + ';' : ''}
      ${positions[i].right ? 'right:' + positions[i].right + ';' : ''}
      top: ${positions[i].top};
      width: ${positions[i].w}px; height: ${positions[i].h}px;
      border-color: ${color}; font-size: 40px;
    `;
    frame.textContent = emoji;
    scene.appendChild(frame);
  });
}

// 핫스팟 렌더링
function renderHotspots(scene, room) {
  scene.querySelectorAll('.hotspot').forEach(el => el.remove());
  room.hotspots.forEach(spot => {
    const wrap = document.createElement('div');
    wrap.className = 'hotspot';
    wrap.style.cssText = `left: ${spot.x}%; top: ${spot.y}%;`;
    const btn = document.createElement('button');
    btn.className = 'hotspot-btn';
    btn.innerHTML = `
      <span class="hotspot-icon">${spot.label.split(' ')[0]}</span>
      <span class="hotspot-label">${spot.label.split(' ').slice(1).join(' ')}</span>
    `;
    btn.addEventListener('click', () => openPopup(spot.title, spot.content));
    wrap.appendChild(btn);
    scene.appendChild(wrap);
  });
}

// ══════════════════════════════════════════
// 사이드바 (퀴즈 + 자물쇠)
// ══════════════════════════════════════════
function renderSidebar(room) {
  renderQuizQuestion(room, 0);
  renderLockSection(room);
}

function renderQuizQuestion(room, questionIdx) {
  const quiz = room.quizzes[questionIdx];

  const progressEl = document.getElementById('quiz-progress');
  if (progressEl) progressEl.textContent = `문제 ${questionIdx + 1} / ${room.quizzes.length}`;

  const quizQ    = document.getElementById('quiz-question');
  const quizOpts = document.getElementById('quiz-options');
  const quizFB   = document.getElementById('quiz-feedback');
  const nextBtn  = document.getElementById('quiz-next-btn');

  // 작품 이미지 표시
  let imgWrap = document.getElementById('quiz-image-wrap');
  if (!imgWrap) {
    imgWrap = document.createElement('div');
    imgWrap.id = 'quiz-image-wrap';
    imgWrap.className = 'quiz-artwork-wrap';
    quizQ.parentNode.insertBefore(imgWrap, quizQ);
  }
  if (quiz.image) {
    imgWrap.innerHTML = `
      <img src="${quiz.image}" alt="${quiz.imageCaption || '작품 이미지'}" class="quiz-artwork-img" loading="lazy">
      ${quiz.imageCaption ? `<div class="quiz-artwork-caption">${quiz.imageCaption}</div>` : ''}
    `;
    imgWrap.style.display = 'block';
  } else {
    imgWrap.style.display = 'none';
  }

  quizQ.innerHTML = quiz.question;
  quizOpts.innerHTML = '';
  quizOpts.dataset.hasWrong = 'false';
  quizOpts.dataset.answered = 'false';
  quizFB.className = 'quiz-feedback';
  quizFB.innerHTML = '';
  if (nextBtn) nextBtn.style.display = 'none';

  quiz.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt.text;
    btn.dataset.correct = opt.correct;
    btn.addEventListener('click', () => onQuizOption(btn, opt, quiz, room));
    quizOpts.appendChild(btn);
  });
}

// 퀴즈 정답 처리
function onQuizOption(btn, opt, quiz, room) {
  const allBtns = document.querySelectorAll('.quiz-option');
  const quizOpts = document.getElementById('quiz-options');
  const feedback = document.getElementById('quiz-feedback');
  const nextBtn  = document.getElementById('quiz-next-btn');

  if (quizOpts.dataset.answered === 'true') return;

  if (opt.correct) {
    if (quizOpts.dataset.hasWrong === 'false') {
      totalAnswered++;
      totalCorrect++;
    }
    quizOpts.dataset.answered = 'true';

    allBtns.forEach(b => {
      b.disabled = true;
      if (b.dataset.correct === 'true') b.classList.add('correct');
    });

    btn.classList.add('correct');
    feedback.className = 'quiz-feedback show success';
    
    let clueHtml = '';
    if (currentQuizIndex < 4) {
      const nth = ["첫", "두", "세", "네"][currentQuizIndex];
      const digit = room.lockCode[currentQuizIndex];
      clueHtml = `<div style="margin-top:12px; padding: 10px; background: rgba(201,168,76,0.15); border-left: 4px solid var(--gold); font-size: 1.05em; color: #fff;">
        🔑 <strong>단서 발견!</strong> 방탈출 코드의 ${nth} 번째 숫자: <strong style="color:var(--gold); font-size:1.2em;">[ ${digit} ]</strong>
      </div>`;
    } else {
      clueHtml = `<div style="margin-top:12px; padding: 10px; background: rgba(201,168,76,0.15); border-left: 4px solid var(--gold); font-size: 1.05em; color: #fff;">
        🌟 <strong>완벽합니다!</strong> 모든 퀴즈의 비밀이 풀렸습니다. 이제 코드를 조합해보세요!
      </div>`;
    }
    
    feedback.innerHTML = `✅ <strong>정답!</strong> ${quiz.explanation}${clueHtml}`;

    if (nextBtn) {
      nextBtn.style.display = 'flex';
      const isLast = (currentQuizIndex === room.quizzes.length - 1);
      nextBtn.textContent = isLast ? '✅ 퀴즈 완료! 자물쇠 해제하기' : '다음 문제 →';
      nextBtn.onclick = () => advanceQuiz(room);
    }
  } else {
    // 오답 클릭 시
    if (quizOpts.dataset.hasWrong === 'false') {
      totalAnswered++;
      quizOpts.dataset.hasWrong = 'true';
    }
    
    btn.disabled = true;
    btn.classList.add('wrong');
    feedback.className = 'quiz-feedback show error';
    
    feedback.innerHTML = `❌ <strong>오답!</strong> 다시 한번 도전해보세요!<br>
      <div style="margin-top:10px; padding: 8px; font-size: 0.9em; color: rgba(255,255,255,0.7); border-left: 4px solid #e53935;">
        ⚠️ 첫 시도에 틀렸으므로 오답 1개가 누적되었습니다. 다시 다른 보기를 선택해서 정답을 맞히면 비밀 코드가 공개됩니다!
      </div>`;
  }
}

function advanceQuiz(room) {
  currentQuizIndex++;
  if (currentQuizIndex < room.quizzes.length) {
    const progressEl = document.getElementById('quiz-progress');
    if (progressEl) progressEl.textContent = `문제 ${currentQuizIndex + 1} / ${room.quizzes.length}`;
    renderQuizQuestion(room, currentQuizIndex);
  } else {
    quizAllDone = true;
    showQuizComplete(room);
  }
}

function showQuizComplete(room) {
  const quizQ    = document.getElementById('quiz-question');
  const quizOpts = document.getElementById('quiz-options');
  const quizFB   = document.getElementById('quiz-feedback');
  const nextBtn  = document.getElementById('quiz-next-btn');
  const progressEl = document.getElementById('quiz-progress');
  const imgWrap    = document.getElementById('quiz-image-wrap');

  if (progressEl) progressEl.textContent = `${room.quizzes.length}문제 완료 🎉`;
  if (imgWrap) imgWrap.style.display = 'none';
  quizQ.innerHTML = '🎉 모든 퀴즈를 완료했습니다!<br>이제 자물쇠 코드를 입력하세요.';
  quizOpts.innerHTML = '';
  quizFB.className = 'quiz-feedback show success';
  quizFB.innerHTML = '💡 작품을 클릭해 얻은 단서로 아래 코드를 입력해 탈출하세요!';
  if (nextBtn) nextBtn.style.display = 'none';

  const lockSection = document.getElementById('lock-section');
  if (lockSection) {
    lockSection.style.border = '1px solid var(--gold)';
    lockSection.style.boxShadow = '0 0 20px rgba(201,168,76,0.3)';
    lockSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// 자물쇠 섹션
function renderLockSection(room) {
  document.getElementById('lock-hint').innerHTML = room.finalCodeHint;
  const lockInput = document.getElementById('lock-input');
  const lockMsg   = document.getElementById('lock-message');
  lockInput.value = '';
  lockMsg.textContent = '';
  lockMsg.className = 'lock-message';
  lockInput.oninput = () => {
    lockInput.value = lockInput.value.replace(/\D/g, '').slice(0, 4);
  };
}

document.getElementById('lock-submit').addEventListener('click', checkLock);
document.getElementById('lock-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') checkLock();
});

function checkLock() {
  const room  = ROOMS[currentRoomIndex + 1];
  const input = document.getElementById('lock-input');
  const msg   = document.getElementById('lock-message');
  const code  = input.value.trim();

  if (code.length < 4) {
    msg.className = 'lock-message error-msg';
    msg.textContent = '⚠️ 4자리 코드를 입력하세요.';
    return;
  }
  if (code === room.lockCode) {
    input.classList.add('correct-flash');
    msg.className = 'lock-message success-msg';
    msg.textContent = room.successMessage;
    setTimeout(() => { input.classList.remove('correct-flash'); goNextRoom(); }, 1500);
  } else {
    input.classList.add('shake');
    msg.className = 'lock-message error-msg';
    msg.textContent = '🔒 틀린 코드입니다. 단서를 다시 확인하세요!';
    setTimeout(() => {
      input.classList.remove('shake');
      msg.textContent = '';
      msg.className = 'lock-message';
    }, 1800);
  }
}

function goNextRoom() {
  const nextIndex = currentRoomIndex + 1;
  if (nextIndex >= 4) {
    stopTimer();
    playDoorTransition('🎉 탈출 성공!', () => { renderEnding(); showScreen('ending'); });
    return;
  }
  const nextRoom = ROOMS[nextIndex + 1];
  playDoorTransition(`✨ ${nextRoom.title}`, () => {
    currentRoomIndex = nextIndex;
    renderRoom(currentRoomIndex);
  });
}

document.getElementById('hint-btn').addEventListener('click', () => {
  const room = ROOMS[currentRoomIndex + 1];
  openPopup('💡 힌트', `
    <strong>자물쇠 힌트:</strong><br><br>
    ${room.lockHint}<br><br>
    <span class="clue-tag">💡 오른쪽 퀴즈를 맞히면 자물쇠 코드 단서가 하나씩 공개됩니다!</span>
  `, true);
});

// ══════════════════════════════════════════
// 엔딩 & 점수 제출
// ══════════════════════════════════════════
function renderEnding() {
  const elapsed = getElapsedSec();
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  const timeStr = `${m}분 ${String(s).padStart(2,'0')}초`;

  // 점수 계산
  const accuracyScore = Math.round((totalCorrect / TOTAL_QUESTIONS) * 70 * 10) / 10;
  const MIN_SEC = 300, MAX_SEC = 1800;
  let speedScore;
  if (elapsed <= MIN_SEC) speedScore = 30;
  else if (elapsed >= MAX_SEC) speedScore = 0;
  else speedScore = Math.round(30 * (1 - (elapsed - MIN_SEC) / (MAX_SEC - MIN_SEC)) * 10) / 10;
  const totalScore = Math.round((accuracyScore + speedScore) * 10) / 10;

  // 엔딩 화면 이름·점수 업데이트
  const nameEl = document.getElementById('ending-player-name');
  if (nameEl) nameEl.textContent = `${playerName}님, 탁월한 미술사 탐정입니다!`;

  const accEl = document.getElementById('score-accuracy-val');
  const timeEl = document.getElementById('score-time-val');
  const totEl  = document.getElementById('score-total-val');
  if (accEl)  accEl.textContent  = `${totalCorrect}/${TOTAL_QUESTIONS}`;
  if (timeEl) timeEl.textContent = timeStr;
  if (totEl)  totEl.textContent  = `${totalScore}점`;

  launchConfetti();

  // 서버에 점수 제출 (서버 모드일 때만)
  submitScore({
    name:        playerName,
    correct:     totalCorrect,
    total:       TOTAL_QUESTIONS,
    elapsed_sec: elapsed
  });
}

async function submitScore(data) {
  const statusEl = document.getElementById('submit-status');
  // file:// 프로토콜이면 서버 없음 → 안내만 표시
  if (location.protocol === 'file:') {
    if (statusEl) statusEl.textContent = '💡 순위 기능은 Vercel 배포 후 이용 가능합니다.';
    return;
  }
  try {
    if (statusEl) statusEl.textContent = '📡 점수 제출 중...';
    const resp = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await resp.json();
    if (result.ok) {
      if (statusEl) statusEl.innerHTML =
        `✅ <strong style="color:var(--gold)">${result.score}점</strong> 순위표에 등록됐습니다!`;
    }
  } catch(e) {
    if (statusEl) statusEl.textContent = '⚠️ 점수 제출 실패 (네트워크 확인)';
  }
}

function launchConfetti() {
  const colors = ['#c9a84c', '#e8c96a', '#4a90d9', '#e53935', '#4caf50', '#f8bbd0'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      p.style.cssText = `
        left: ${Math.random() * 100}vw; top: 0;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration: ${1.5 + Math.random() * 2}s;
        transform: rotate(${Math.random() * 360}deg);
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }, i * 60);
  }
}

document.getElementById('btn-restart').addEventListener('click', () => {
  currentRoomIndex = 0;
  totalCorrect  = 0;
  totalAnswered = 0;
  stopTimer();
  playDoorTransition('🏛️ 다시 시작', () => showScreen('name'));
});

// ══════════════════════════════════════════
// 초기화
// ══════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  renderIntro();
  showScreen('name');
  // 이름 입력창에 포커스
  setTimeout(() => {
    const inp = document.getElementById('player-name-input');
    if (inp) inp.focus();
  }, 400);
});

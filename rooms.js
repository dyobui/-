// =============================================
// 서양미술사 방탈출 - 방 데이터 (이미지 기반 퀴즈)
// =============================================

const ROOMS = [
  {
    id: 'intro',
    title: '밤의 미술관을 탈출해라!',
    subtitle: '미술관 게임',
    story: `오늘 밤, 당신은 세계적인 '서울세종박물관'에 홀로 갇혔습니다.\n\n박물관의 보안 시스템이 오작동하여 4개의 전시실 문이 모두 잠겼습니다.\n\n각 전시실 안에 숨겨진 작품을 감상하고\n미술사 퀴즈를 풀어 자물쇠를 열고 탈출하세요!`,
    type: 'intro'
  },

  // ══════════════════════════════════════════
  // 방 1: 고대 & 중세
  // ══════════════════════════════════════════
  {
    id: 'room1', number: 1,
    title: '제1전시실: 고대와 중세의 빛',
    era: '고대 ~ 중세 (기원전 ~ 1400년)',
    theme: 'ancient',
    lockCode: '1492',
    lockHint: '중세의 끝을 알린 사건의 연도 (콜럼버스의 신대륙 발견)',
    bgDescription: '황금빛 모자이크와 스테인드글라스가 빛나는 신비로운 공간',

    hotspots: [
      {
        id: 'h1_1', label: '🏛️ 비잔틴 성화', x: 15, y: 30,
        title: '비잔틴 미술의 특징',
        content: `<strong>비잔틴 미술 (4~15세기)</strong><br><br>
          • 배경을 <em>금색</em>으로 표현 → 신성함을 상징<br>
          • 인물을 <em>평면적·정면</em>으로 묘사<br>
          • 대표 기법: <strong>모자이크</strong>`
      },
      {
        id: 'h1_2', label: '⛪ 고딕 성당', x: 55, y: 25,
        title: '고딕 미술의 특징',
        content: `<strong>고딕 미술 (12~15세기)</strong><br><br>
          • 하늘을 향한 <em>첨두 아치</em>와 높은 첨탑<br>
          • 빛을 통과시키는 <em>스테인드글라스</em><br>
          • 대표: 노트르담 대성당(파리)`
      },
      {
        id: 'h1_3', label: '🗿 그리스 조각', x: 78, y: 40,
        title: '그리스·로마 고전미술',
        content: `<strong>그리스·로마 미술 (기원전 5~2세기)</strong><br><br>
          • <em>이상적 인체미</em> — 황금비율, 완벽한 균형<br>
          • 대표작: 밀로의 비너스, 라오콘 군상`
      }
    ],

    quizzes: [
      {
        image: 'images/byzantine_mosaic.png',
        imageCaption: '비잔틴 모자이크화 (6세기경)',
        question: '이 그림의 배경 색은 무엇인가요? 이 색이 상징하는 것은?',
        options: [
          { text: '파란색 — 하늘과 바다를 상징', correct: false },
          { text: '금색(황금) — 신성함과 천국의 빛을 상징', correct: true },
          { text: '흰색 — 순수함을 상징', correct: false },
          { text: '빨간색 — 예수님의 피를 상징', correct: false }
        ],
        explanation: '비잔틴 미술에서 황금빛 배경은 신성함과 천국을 상징합니다.'
      },
      {
        image: 'images/byzantine_icon.png',
        imageCaption: '비잔틴 성화 (마리아와 아기 예수)',
        question: '이 그림의 인물 표현 방식은 어떤 특징이 있나요?',
        options: [
          { text: '자연스럽고 사실적으로 그려져 있다', correct: false },
          { text: '평면적이고 정면을 바라보는 방식으로 그려져 있다', correct: true },
          { text: '인물 뒤에 원근법적 배경이 있다', correct: false },
          { text: '그림자와 입체감이 뚜렷하다', correct: false }
        ],
        explanation: '비잔틴 성화는 인물을 평면적으로, 정면을 향해 바라보는 방식으로 그립니다. 원근법이나 입체감은 사용하지 않았습니다.'
      },
      {
        image: 'images/stained_glass.png',
        imageCaption: '고딕 성당의 화려한 원형 창문',
        question: '이 교회 창문 기법의 이름은 무엇인가요?',
        options: [
          { text: '프레스코', correct: false },
          { text: '모자이크', correct: false },
          { text: '스테인드글라스', correct: true },
          { text: '유화', correct: false }
        ],
        explanation: '스테인드글라스는 색유리를 납선으로 이어붙여 그림을 만드는 기법으로, 고딕 성당의 상징입니다.'
      },
      {
        image: 'images/gothic_cathedral.png',
        imageCaption: '중세 성당 내부 (파리, 13세기)',
        question: '이 건물은 어떤 미술 양식의 대표 건축물인가요?',
        options: [
          { text: '로마네스크 양식', correct: false },
          { text: '르네상스 양식', correct: false },
          { text: '고딕 양식', correct: true },
          { text: '바로크 양식', correct: false }
        ],
        explanation: '뾰족한 첨두아치, 스테인드글라스 장미창, 높이 솟은 구조는 고딕 양식의 특징입니다.'
      },
      {
        image: 'images/venus_de_milo.png',
        imageCaption: '대리석 여인상 조각',
        question: '이 조각상은 어느 시대, 어느 나라의 작품인가요?',
        options: [
          { text: '중세 유럽의 기독교 조각', correct: false },
          { text: '고대 그리스의 대리석 조각', correct: true },
          { text: '르네상스 이탈리아의 조각', correct: false },
          { text: '고대 이집트의 조각', correct: false }
        ],
        explanation: '밀로의 비너스는 기원전 고대 그리스 시대의 대리석 조각상으로, 이상적인 인체미를 보여줍니다.'
      }
    ],

    finalCodeHint: `<strong>탈출 코드</strong>를 찾아라!<br><br>
      방 안의 작품 단서를 모아<br>
      <em>콜럼버스의 신대륙 발견</em>과 관련된 코드를 입력하세요.`,
    successMessage: '🗝️ 딸깍! 문이 열렸습니다!\n르네상스의 빛이 당신을 기다립니다...'
  },

  // ══════════════════════════════════════════
  // 방 2: 르네상스
  // ══════════════════════════════════════════
  {
    id: 'room2', number: 2,
    title: '제2전시실: 르네상스의 탄생',
    era: '르네상스 (1400~1600년)',
    theme: 'renaissance',
    lockCode: '1503',
    lockHint: '레오나르도 다빈치가 모나리자를 그리기 시작한 해',
    bgDescription: '피렌체의 화가 작업실, 캔버스와 물감 냄새가 가득한 공간',

    hotspots: [
      {
        id: 'h2_1', label: '🖼️ 모나리자', x: 20, y: 30,
        title: '레오나르도 다빈치',
        content: `<strong>레오나르도 다빈치 (1452~1519)</strong><br><br>
          • 대표작: <em>모나리자, 최후의 만찬</em><br>
          • <strong>스푸마토 기법</strong>: 윤곽선을 흐릿하게 처리`
      },
      {
        id: 'h2_2', label: '🙏 천장화', x: 55, y: 20,
        title: '미켈란젤로',
        content: `<strong>미켈란젤로 (1475~1564)</strong><br><br>
          • 대표작: <em>다비드상, 시스티나 천장화</em><br>
          • 4년간 누워서 천장화를 그림`
      },
      {
        id: 'h2_3', label: '📐 원근법', x: 78, y: 45,
        title: '르네상스의 원근법',
        content: `<strong>선형 원근법 (투시도법)</strong><br><br>
          • 멀리 있을수록 작게, 소실점을 향해 수렴<br>
          • 중세에 없던 기법 — 르네상스의 핵심`
      }
    ],

    quizzes: [
      {
        image: 'images/mona_lisa.png',
        imageCaption: '르네상스 시대 이탈리아 여인의 초상화',
        question: '이 작품을 그린 화가의 이름은 누구인가요?',
        options: [
          { text: '미켈란젤로', correct: false },
          { text: '라파엘로', correct: false },
          { text: '레오나르도 다빈치', correct: true },
          { text: '보티첼리', correct: false }
        ],
        explanation: '모나리자는 레오나르도 다빈치가 1503년경부터 그린 르네상스의 대표작입니다.'
      },
      {
        image: 'images/mona_lisa.png',
        imageCaption: '르네상스 초상화 — 윤곽선과 배경을 살펴보세요',
        question: '이 그림에서 인물의 윤곽선이 흐릿하고 신비로운 이유는?',
        options: [
          { text: '물감이 오래되어 색이 바랬기 때문에', correct: false },
          { text: '스푸마토 기법으로 윤곽선을 일부러 흐릿하게 그렸기 때문에', correct: true },
          { text: '수채화로 그렸기 때문에', correct: false },
          { text: '멀리서 찍은 사진처럼 흐릿하게 표현한 것이기 때문에', correct: false }
        ],
        explanation: '스푸마토(이탈리아어로 "연기처럼")는 경계를 흐릿하게 표현하는 기법으로 신비로운 분위기를 만듭니다.'
      },
      {
        image: 'images/creation_of_adam.png',
        imageCaption: '시스티나 예배당 천장화의 일부 (16세기 로마)',
        question: '이 그림을 그린 화가는 누구인가요?',
        options: [
          { text: '레오나르도 다빈치', correct: false },
          { text: '라파엘로', correct: false },
          { text: '보티첼리', correct: false },
          { text: '미켈란젤로', correct: true }
        ],
        explanation: '시스티나 천장화의 "아담의 창조"는 미켈란젤로가 1508~1512년에 그린 작품입니다.'
      },
      {
        image: 'images/last_supper.png',
        imageCaption: '레오나르도 다빈치의 벽화 (밀라노, 1494~1498년)',
        question: '이 그림 속 예수님의 제자 중 예수님을 배신한 인물은 누구인가요?',
        options: [
          { text: '베드로 (페트로)', correct: false },
          { text: '요한', correct: false },
          { text: '가롯 유다', correct: true },
          { text: '도마', correct: false }
        ],
        explanation: '가롯 유다(Judas Iscariot)는 은화 30닢을 받고 예수님을 배신한 제자입니다. 이 그림은 레오나르도 다빈치의 "최후의 만찬"으로, 유다가 배신을 예고받는 순간을 담았습니다.'
      },
      {
        image: 'images/birth_of_venus.png',
        imageCaption: '르네상스 시대 여인의 탄생 장면 (15세기)',
        question: '이 그림의 소재로 가장 옳은 것은?',
        options: [
          { text: '성경의 종교적 장면', correct: false },
          { text: '고대 그리스·로마 신화 장면', correct: true },
          { text: '왕과 귀족의 초상화', correct: false },
          { text: '농민들의 일상생활', correct: false }
        ],
        explanation: '비너스의 탄생은 고대 그리스 신화에서 바다에서 태어난 미의 여신 비너스를 주제로 한 르네상스 회화입니다. 르네상스는 고대 그리스·로마 신화에도 관심을 가졌습니다.'
      }
    ],

    finalCodeHint: `<strong>탈출 코드</strong>를 찾아라!<br><br>
      세계에서 가장 유명한 그림,<br>
      <em>모나리자</em>를 그린 화가와 관련된 단서를 찾아 코드를 입력하세요.`,
    successMessage: '🗝️ 딸깍! 르네상스의 문이 열렸습니다!\n바로크의 극적인 빛이 당신을 부릅니다...'
  },

  // ══════════════════════════════════════════
  // 방 3: 바로크 & 로코코
  // ══════════════════════════════════════════
  {
    id: 'room3', number: 3,
    title: '제3전시실: 바로크의 빛과 그림자',
    era: '바로크·로코코 (1600~1780년)',
    theme: 'baroque',
    lockCode: '1666',
    lockHint: '루이 14세가 프랑스 왕립 아카데미를 설립한 해',
    bgDescription: '극적인 명암이 드리운 웅장한 궁정 갤러리',

    hotspots: [
      {
        id: 'h3_1', label: '🕯️ 카라바조', x: 18, y: 28,
        title: '카라바조와 키아로스쿠로',
        content: `<strong>카라바조 (1571~1610)</strong><br><br>
          • <strong>키아로스쿠로</strong>: 극적인 빛과 그림자 대비<br>
          • 종교 장면을 서민적으로 묘사`
      },
      {
        id: 'h3_2', label: '👑 렘브란트', x: 52, y: 22,
        title: '렘브란트',
        content: `<strong>렘브란트 (1606~1669)</strong><br><br>
          • 내면의 심리를 극적인 조명으로 표현<br>
          • 자화상을 100점 이상 그림`
      },
      {
        id: 'h3_3', label: '🌸 로코코', x: 78, y: 38,
        title: '로코코 미술',
        content: `<strong>로코코 (18세기 프랑스)</strong><br><br>
          • 바로크보다 가볍고 화려한 양식<br>
          • 파스텔 색조, 귀족 생활 묘사`
      }
    ],

    quizzes: [
      {
        image: 'images/caravaggio_calling.png',
        imageCaption: '성 마태오의 소명 (카라바조, 1600년)',
        question: '이 그림에서 가장 눈에 띄는 표현 방법은?',
        options: [
          { text: '파스텔 색조의 부드럽고 밝은 표현', correct: false },
          { text: '강렬한 빛과 어둠의 극적인 대비', correct: true },
          { text: '점을 찍어 표현하는 점묘 기법', correct: false },
          { text: '윤곽선이 흐릿한 스푸마토 기법', correct: false }
        ],
        explanation: '카라바조는 강렬한 빛과 깊은 어둠을 극적으로 대비시키는 "키아로스쿠로" 기법으로 유명합니다.'
      },
      {
        image: 'images/rembrandt_self_portrait.png',
        imageCaption: '바로크 시대 화가의 자화상 (17세기 네덜란드)',
        question: '이 화가의 이름은 누구인가요?',
        options: [
          { text: '카라바조', correct: false },
          { text: '루벤스', correct: false },
          { text: '렘브란트', correct: true },
          { text: '반 에이크', correct: false }
        ],
        explanation: '렘브란트는 100점 이상의 자화상을 남긴 화가로, 따뜻한 빛과 어둠으로 내면의 심리를 표현했습니다.'
      },
      {
        image: 'images/rembrandt_night_watch.png',
        imageCaption: '17세기 네덜란드 바로크 대형 집단 초상화',
        question: '이 그림의 제목은 무엇인가요?',
        options: [
          { text: '최후의 만찬', correct: false },
          { text: '야경', correct: true },
          { text: '민병대의 행진', correct: false },
          { text: '해부학 강의', correct: false }
        ],
        explanation: '야경은 렘브란트가 1642년에 그린 암스테르담 민병대의 집단 초상화로, 바로크 미술의 대표작입니다.'
      },
      {
        image: 'images/rococo_watteau.png',
        imageCaption: '18세기 프랑스 귀족들의 야외 연회',
        question: '이 그림은 어떤 미술 양식인가요?',
        options: [
          { text: '바로크 양식 — 강렬하고 어두운 표현', correct: false },
          { text: '로코코 양식 — 화려하고 우아한 귀족 생활 표현', correct: true },
          { text: '인상주의 — 빛과 순간을 짧은 붓터치로 표현', correct: false },
          { text: '르네상스 양식 — 종교와 고대 그리스 주제', correct: false }
        ],
        explanation: '로코코는 18세기 프랑스 귀족 문화에서 발전한 양식으로, 파스텔 색조와 우아한 귀족 생활 묘사가 특징입니다.'
      },
      {
        image: 'images/baroque_rubens.png',
        imageCaption: '바로크 회화 (루벤스 스타일)',
        question: '바로크 미술의 특징으로 가장 맞는 것은?',
        options: [
          { text: '평면적이고 정면을 바라보는 표현', correct: false },
          { text: '부드럽고 섬세한 파스텔 색조', correct: false },
          { text: '움직임과 감정이 넘치는 역동적인 표현', correct: true },
          { text: '작고 정밀한 세밀화 기법', correct: false }
        ],
        explanation: '바로크 미술은 강렬한 명암 대비, 역동적인 움직임, 풍성한 볼륨감이 특징입니다.'
      }
    ],

    finalCodeHint: `<strong>탈출 코드</strong>를 찾아라!<br><br>
      바로크의 후원자, 루이 14세가<br>
      <em>프랑스 왕립 회화 조각 아카데미</em>를 설립한 것과 관련된 단서를 찾아 코드를 입력하세요.`,
    successMessage: '🗝️ 딸깍! 바로크 문이 열렸습니다!\n마지막 전시실로... 인상주의가 기다립니다!'
  },

  // ══════════════════════════════════════════
  // 방 4: 인상주의 & 현대
  // ══════════════════════════════════════════
  {
    id: 'room4', number: 4,
    title: '제4전시실: 인상주의와 그 너머',
    era: '인상주의·현대미술 (1860년~)',
    theme: 'impressionism',
    lockCode: '1874',
    lockHint: '파리에서 최초의 인상파 그룹전이 열린 해',
    bgDescription: '빛과 색채가 넘실대는 야외 화랑',

    hotspots: [
      {
        id: 'h4_1', label: '💧 모네', x: 15, y: 30,
        title: '클로드 모네',
        content: `<strong>클로드 모네 (1840~1926)</strong><br><br>
          • 빛의 변화에 따른 순간적 인상 포착<br>
          • 대표작: <em>수련 연작, 인상 해돋이</em>`
      },
      {
        id: 'h4_2', label: '⭐ 고흐', x: 52, y: 22,
        title: '빈센트 반 고흐',
        content: `<strong>빈센트 반 고흐 (1853~1890)</strong><br><br>
          • 격렬한 붓터치와 강렬한 원색으로 감정 표현<br>
          • 대표작: <em>별이 빛나는 밤, 해바라기</em>`
      },
      {
        id: 'h4_3', label: '🎠 쇠라', x: 78, y: 35,
        title: '조르주 쇠라 — 점묘법',
        content: `<strong>조르주 쇠라 (1859~1891)</strong><br><br>
          • <strong>점묘법</strong>: 순색 점을 찍어 눈에서 색 혼합<br>
          • 가까이 보면 점, 멀리 보면 완전한 그림`
      }
    ],

    quizzes: [
      {
        image: 'images/monet_water_lilies.png',
        imageCaption: '프랑스 인상주의 화가의 연못 수련 그림',
        question: '이 그림을 그린 화가는 누구인가요?',
        options: [
          { text: '빈센트 반 고흐', correct: false },
          { text: '조르주 쇠라', correct: false },
          { text: '폴 세잔', correct: false },
          { text: '클로드 모네', correct: true }
        ],
        explanation: '수련 연작은 클로드 모네가 자신의 정원 연못을 반복해서 그린 인상주의의 대표작입니다.'
      },
      {
        image: 'images/monet_water_lilies.png',
        imageCaption: '연못 풍경화 (세부)',
        question: '이 그림에서 물의 반짝임과 빛을 어떻게 표현했나요?',
        options: [
          { text: '선명한 윤곽선으로 정밀하게 그렸다', correct: false },
          { text: '짧고 자유로운 붓터치로 빛의 순간을 포착했다', correct: true },
          { text: '색을 섞지 않고 점으로만 표현했다', correct: false },
          { text: '사진처럼 정확하게 사실적으로 그렸다', correct: false }
        ],
        explanation: '인상주의는 짧고 자유로운 붓터치로 빛의 변화와 순간적인 인상을 포착하는 것이 특징입니다.'
      },
      {
        image: 'images/rococo_watteau.png',  // 비교 용도로 재사용 (로코코 vs 인상주의 비교)
        imageCaption: '로코코 그림 vs 인상주의 그림 비교',
        question: '인상주의 그림과 이 로코코 그림을 비교했을 때, 인상주의만의 특징은?',
        options: [
          { text: '귀족들의 화려한 생활을 정밀하게 표현함', correct: false },
          { text: '빛과 색의 순간적 변화를 짧은 붓터치로 포착함', correct: true },
          { text: '종교적 장면을 평면적으로 표현함', correct: false },
          { text: '강렬한 어둠과 빛의 대비를 사용함', correct: false }
        ],
        explanation: '인상주의는 순간적인 빛의 변화와 인상을 짧은 붓터치로 포착하는 것이 핵심입니다. 로코코처럼 정밀하거나 바로크처럼 어둡지 않습니다.'
      },
      {
        image: 'images/caravaggio_calling.png',  // 비교 용도 (바로크 vs 인상주의)
        imageCaption: '바로크 작품 (카라바조)',
        question: '인상주의 화가 모네의 그림과 이 바로크 작품의 차이점은?',
        options: [
          { text: '모네는 어두운 실내, 카라바조는 밝은 야외를 그렸다', correct: false },
          { text: '모네는 빛이 넘치는 야외 풍경, 카라바조는 극적인 어둠과 빛을 사용했다', correct: true },
          { text: '두 그림 모두 같은 기법을 사용했다', correct: false },
          { text: '모네는 점묘법, 카라바조는 스푸마토를 사용했다', correct: false }
        ],
        explanation: '인상주의는 햇빛 가득한 야외에서 빛의 변화를 포착하고, 바로크는 극적인 명암 대비(키아로스쿠로)를 사용합니다.'
      },
      {
        image: 'images/rembrandt_night_watch.png',  // 비교 원근법
        imageCaption: '야경 (렘브란트) — 이전에 배웠던 작품입니다!',
        question: '지금까지 배운 미술 시대를 순서대로 바르게 나열한 것은?',
        options: [
          { text: '인상주의 → 바로크 → 르네상스 → 중세', correct: false },
          { text: '중세 → 바로크 → 르네상스 → 인상주의', correct: false },
          { text: '중세 → 르네상스 → 바로크 → 인상주의', correct: true },
          { text: '르네상스 → 중세 → 인상주의 → 바로크', correct: false }
        ],
        explanation: '서양미술사의 흐름: 중세(~1400) → 르네상스(1400~1600) → 바로크(1600~1750) → 인상주의(1860~)입니다.'
      }
    ],

    finalCodeHint: `<strong>최후의 탈출 코드</strong>를 찾아라!<br><br>
      모네, 르누아르, 드가가 함께한<br>
      역사적인 <em>제1회 인상파 전시회</em>와 관련된 단서를 찾아 코드를 입력하세요.`,
    successMessage: '🎊 탈출 성공!\n모든 전시실을 통과했습니다!'
  }
];

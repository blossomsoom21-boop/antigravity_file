// 초기 작품 데이터베이스 (v3 - 대규모 업데이트)
// type 값: "Anime" | "Drama" | "Manga" | "Movie" | ["Anime","Movie"] 등 복수 지원
window.INITIAL_WORKS = [

  // ============================================================
  // 🎌 애니메이션 (기존)
  // ============================================================
  {
    id: 1,
    title: "귀멸의 칼날",
    type: ["Anime"],
    genres: ["액션", "판타지", "모험"],
    country: "일본", year: 2019,
    synopsis: "혈귀에게 가족을 잃고 귀살대의 길을 걷게 된 소년 탄지로가 혈귀로 변해버린 여동생 네즈코를 다시 인간으로 되돌리기 위해 여정을 떠나는 이야기.",
    emoji: "⚔️", gradient: "linear-gradient(135deg, #ff4e50, #f9d423)"
  },
  {
    id: 2,
    title: "진격의 거인",
    type: ["Anime"],
    genres: ["액션", "판타지", "스릴러"],
    country: "일본", year: 2013,
    synopsis: "식인 거인들로부터 인류를 보호하기 위해 거대한 벽을 쌓고 살아가던 인류가 벽을 부수고 나타난 초대형 거인을 마주하며 벌어지는 처절한 사투와 세계의 비밀을 그린 작품.",
    emoji: "🧱", gradient: "linear-gradient(135deg, #3a6073, #3a7bd5)"
  },
  {
    id: 4,
    title: "주술회전",
    type: ["Anime"],
    genres: ["액션", "판타지", "스릴러"],
    country: "일본", year: 2020,
    synopsis: "경이로운 신체 능력을 가진 고등학생 이타도리 유지가 특급 주물인 양면 스쿠나의 손가락을 먹고 저주를 몸에 깃들이게 되면서, 주술사들의 세계인 도립 주술 고등학교에 입학해 벌어지는 이야기.",
    emoji: "🧿", gradient: "linear-gradient(135deg, #1d2b64, #f8cdda)"
  },
  {
    id: 5,
    title: "장송의 프리렌",
    type: ["Anime"],
    genres: ["판타지", "모험", "드라마"],
    country: "일본", year: 2023,
    synopsis: "마왕을 물리친 용사 일행의 마법사 프리렌이 동료들의 죽음을 겪으며, 인간에 대해 더 깊이 이해하고 소통하기 위해 새로운 여정을 떠나는 감동적이고 잔잔한 판타지 여정.",
    emoji: "🪄", gradient: "linear-gradient(135deg, #654ea3, #eaafc8)"
  },

  // ============================================================
  // 🎌 애니메이션 (신규 추가)
  // ============================================================
  {
    id: 20,
    title: "명탐정 코난",
    type: ["Anime"],
    genres: ["미스터리", "추리", "범죄"],
    country: "일본", year: 1996,
    synopsis: "고등학생 탐정 쿠도 신이치가 검은 조직에 의해 어린아이로 돌아간 후, 에도가와 코난이라는 가명으로 활동하며 사건을 해결하고 원래 몸으로 돌아가기 위해 노력하는 추리 만화.",
    emoji: "🔍", gradient: "linear-gradient(135deg, #2193b0, #6dd5ed)"
  },
  {
    id: 21,
    title: "슈가슈가룬",
    type: ["Anime"],
    genres: ["마법소녀", "로맨스", "판타지"],
    country: "일본", year: 2005,
    synopsis: "마녀 나라의 왕위 계승을 위해 인간 세계로 파견된 쇼콜라와 바닐라가 인간의 '심장'을 모으는 임무를 수행하며 우정과 사랑을 깨달아가는 마법소녀 이야기.",
    emoji: "🍬", gradient: "linear-gradient(135deg, #f093fb, #f5576c)"
  },
  {
    id: 22,
    title: "Free!",
    type: ["Anime"],
    genres: ["스포츠", "드라마", "우정"],
    country: "일본", year: 2013,
    synopsis: "수영에 대한 순수한 열정을 품은 하루카와 고교 시절 동료들이 수영부를 창설하고 전국 대회를 목표로 달려가는 청춘 스포츠 애니메이션.",
    emoji: "🏊", gradient: "linear-gradient(135deg, #0099f7, #f11712)"
  },
  {
    id: 23,
    title: "케이온!",
    type: ["Anime"],
    genres: ["음악", "일상", "코미디"],
    country: "일본", year: 2009,
    synopsis: "폐부 위기에 처한 경음악부에 들어가게 된 여고생 히라사와 유이를 중심으로, 개성 넘치는 부원들이 음악과 함께 성장해나가는 일상 음악 애니메이션.",
    emoji: "🎸", gradient: "linear-gradient(135deg, #f7971e, #ffd200)"
  },
  {
    id: 24,
    title: "모노노케 히메",
    type: ["Anime", "Movie"],
    genres: ["판타지", "모험", "자연"],
    country: "일본", year: 1997,
    synopsis: "숲의 신들과 인간들 사이의 전쟁에 휘말린 청년 아시타카가 자신의 저주를 풀기 위해 여행을 떠나 인간과 자연의 공존에 대한 깊은 물음을 던지는 지브리 대표 명작.",
    emoji: "🐺", gradient: "linear-gradient(135deg, #134e5e, #71b280)"
  },
  {
    id: 25,
    title: "하울의 움직이는 성",
    type: ["Anime", "Movie"],
    genres: ["판타지", "로맨스", "모험"],
    country: "일본", year: 2004,
    synopsis: "마녀의 저주로 노파가 된 소녀 소피가 마법사 하울의 이상한 움직이는 성에서 살아가게 되면서 진정한 자신을 찾아가는 따뜻한 판타지 로맨스.",
    emoji: "🏰", gradient: "linear-gradient(135deg, #fc5c7d, #6a82fb)"
  },
  {
    id: 26,
    title: "도쿄 구울",
    type: ["Anime"],
    genres: ["액션", "공포", "다크 판타지"],
    country: "일본", year: 2014,
    synopsis: "인간을 잡아먹는 구울에게 습격당한 대학생 카네키 켄이 구울이 되어버린 뒤 인간과 구울 사이에서 갈등하며 자신만의 길을 찾아가는 다크 판타지.",
    emoji: "👁️", gradient: "linear-gradient(135deg, #870000, #560000)"
  },
  {
    id: 27,
    title: "오늘부터 신령님",
    type: ["Anime"],
    genres: ["로맨스", "초자연", "코미디"],
    country: "일본", year: 2012,
    synopsis: "빚더미에 올라 집을 잃은 소녀 모모조노 나나미가 우연히 토지신의 신표를 받아 신사의 신이 되고, 신사를 지키는 요호 토마오와 얽히며 펼쳐지는 신령 로맨스.",
    emoji: "🦊", gradient: "linear-gradient(135deg, #f7971e, #ffd200)"
  },
  {
    id: 28,
    title: "은혼",
    type: ["Anime"],
    genres: ["액션", "코미디", "SF"],
    country: "일본", year: 2006,
    synopsis: "외계인이 지구에 정착한 SF 시대의 에도를 배경으로, 목검 하나로 만사옥을 운영하는 전설의 전사 사카타 긴토키와 그 동료들의 진지함과 개그가 뒤섞인 이야기.",
    emoji: "🍭", gradient: "linear-gradient(135deg, #c94b4b, #4b134f)"
  },
  {
    id: 29,
    title: "헌터×헌터",
    type: ["Anime"],
    genres: ["액션", "모험", "판타지"],
    country: "일본", year: 2011,
    synopsis: "전설적인 헌터였던 아버지를 찾기 위해 헌터 시험에 도전하는 소년 곤 프릭스가 개성 넘치는 동료들과 함께 성장하며 세계의 어두운 면을 마주하는 모험 판타지.",
    emoji: "🎯", gradient: "linear-gradient(135deg, #11998e, #38ef7d)"
  },
  {
    id: 30,
    title: "나루토",
    type: ["Anime"],
    genres: ["액션", "모험", "우정"],
    country: "일본", year: 2002,
    synopsis: "마을의 외면을 받으며 자란 꼬마 닌자 나루토가 화염인이 되겠다는 꿈을 품고 동료들과 함께 성장하며 세계의 위기에 맞서는 닌자 액션 명작.",
    emoji: "🍥", gradient: "linear-gradient(135deg, #f7971e, #ff6a00)"
  },
  {
    id: 31,
    title: "블리치",
    type: ["Anime"],
    genres: ["액션", "판타지", "초자연"],
    country: "일본", year: 2004,
    synopsis: "영혼을 볼 수 있는 평범한 고등학생 쿠로사키 이치고가 우연히 사신의 힘을 이어받아 악령 '호로'를 물리치고 사신들의 세계와 얽히며 벌어지는 이야기.",
    emoji: "⚡", gradient: "linear-gradient(135deg, #1a1a2e, #16213e)"
  },
  {
    id: 32,
    title: "캐릭캐릭체인지",
    type: ["Anime"],
    genres: ["마법소녀", "로맨스", "학원"],
    country: "일본", year: 2007,
    synopsis: "학교에서 '공주님'이라 불리며 완벽한 척 살아가는 소녀 히나모리 아무가 '진짜 나'를 찾고 싶다는 소원으로 세 개의 알을 얻고 수호 캐릭터들과 함께 성장하는 마법소녀 이야기.",
    emoji: "🃏", gradient: "linear-gradient(135deg, #f953c6, #b91d73)"
  },
  {
    id: 33,
    title: "카드캡터 체리",
    type: ["Anime"],
    genres: ["마법소녀", "판타지", "로맨스"],
    country: "일본", year: 1998,
    synopsis: "우연히 마법 봉인 카드들을 해방시킨 소녀 키노모토 사쿠라가 케르베로스와 함께 클로우 카드를 수집하며 진정한 카드캡터로 성장하는 클래식 마법소녀 명작.",
    emoji: "🌸", gradient: "linear-gradient(135deg, #ee9ca7, #ffdde1)"
  },
  {
    id: 34,
    title: "꿈빛 파티시엘",
    type: ["Anime"],
    genres: ["요리", "학원", "드라마"],
    country: "일본", year: 2008,
    synopsis: "할머니처럼 훌륭한 파티시엘이 되겠다는 꿈을 가진 소녀 이치노미야 이치고가 서양과자 명문학교 스위츠 왕국에 입학해 실력 있는 라이벌들과 경쟁하며 성장하는 이야기.",
    emoji: "🎂", gradient: "linear-gradient(135deg, #f7971e, #ffd200)"
  },
  {
    id: 35,
    title: "신세기 에반게리온",
    type: ["Anime"],
    genres: ["SF", "액션", "심리"],
    country: "일본", year: 1995,
    synopsis: "사도라 불리는 거대 생명체의 공격으로부터 인류를 지키기 위해 인공 진화 병기 '에반게리온'을 조종하게 된 소년 이카리 신지의 심리적 갈등과 성장을 그린 SF 명작.",
    emoji: "🤖", gradient: "linear-gradient(135deg, #0f0f23, #1a472a)"
  },
  {
    id: 36,
    title: "오란고교 사교클럽",
    type: ["Anime"],
    genres: ["로맨스", "코미디", "학원"],
    country: "일본", year: 2006,
    synopsis: "장학생으로 명문 오란고교에 다니는 평범한 소녀 후지오카 하루히가 실수로 사교클럽의 꽃병을 깨뜨리고 빚을 갚기 위해 사교클럽 호스트로 일하며 벌어지는 역하렘 로맨틱 코미디.",
    emoji: "🌹", gradient: "linear-gradient(135deg, #f8b500, #ffe082)"
  },
  {
    id: 37,
    title: "유유백서",
    type: ["Anime"],
    genres: ["액션", "초자연", "모험"],
    country: "일본", year: 1992,
    synopsis: "불량 소년 우라메시 유스케가 어린 아이를 구하려다 목숨을 잃고 영계탐정으로 부활해 요괴들의 위협으로부터 인간계를 지키는 90년대 배틀 액션 명작.",
    emoji: "👊", gradient: "linear-gradient(135deg, #373b44, #4286f4)"
  },
  {
    id: 38,
    title: "달빛천사",
    type: ["Anime"],
    genres: ["음악", "로맨스", "판타지"],
    country: "일본", year: 2004,
    synopsis: "하프를 연주하는 소녀 미치루가 달의 바이올리니스트 타이요를 향한 사랑과 음악에 대한 열정 속에서 가슴 아픈 운명과 마주하는 순수 로맨틱 음악 애니메이션.",
    emoji: "🎵", gradient: "linear-gradient(135deg, #a8edea, #fed6e3)"
  },
  {
    id: 39,
    title: "신비아파트",
    type: ["Anime"],
    genres: ["공포", "초자연", "가족"],
    country: "한국", year: 2017,
    synopsis: "신비아파트에 사는 소년 강하리와 유령 신비가 함께 악령들을 퇴치하며 한국의 전통 귀신과 현대적 스토리를 융합한 국내 대표 공포 어드벤처 애니메이션.",
    emoji: "👻", gradient: "linear-gradient(135deg, #0f0f1a, #2d1b69)"
  },
  {
    id: 40,
    title: "사카모토데이즈",
    type: ["Anime"],
    genres: ["액션", "코미디", "스릴러"],
    country: "일본", year: 2025,
    synopsis: "전설적인 킬러였던 사카모토가 사랑으로 인해 은퇴하고 평범한 편의점 주인이 된 후, 과거가 쫓아오는 상황에서도 가족을 지키기 위해 재능을 발휘하는 액션 코미디.",
    emoji: "🔫", gradient: "linear-gradient(135deg, #1f4037, #99f2c8)"
  },
  {
    id: 41,
    title: "히카루가 죽은 여름",
    type: ["Anime"],
    genres: ["미스터리", "공포", "드라마"],
    country: "일본", year: 2023,
    synopsis: "죽었던 소꿉친구 히카루가 어느 날 갑자기 나타나 함께 살게 된 요시키. 히카루가 숨기고 있는 비밀과 죽음의 진실이 서서히 드러나며 공포가 스며드는 미스터리 호러.",
    emoji: "🌻", gradient: "linear-gradient(135deg, #4b6cb7, #182848)"
  },
  {
    id: 42,
    title: "아름다운 초저녁달",
    type: ["Anime"],
    genres: ["로맨스", "판타지", "드라마"],
    country: "일본", year: 2023,
    synopsis: "평범한 고등학생 아오키 히나가 반신반인의 남자 무라세 아키토와 운명처럼 얽히며 시작되는 초자연적 로맨스. 달과 신화를 모티프로 한 아름다운 영상미가 인상적인 작품.",
    emoji: "🌙", gradient: "linear-gradient(135deg, #0f2027, #2c5364)"
  },

  // ============================================================
  // 📺 드라마 (기존)
  // ============================================================
  {
    id: 6,
    title: "오징어 게임",
    type: ["Drama"],
    genres: ["스릴러", "드라마", "미스터리"],
    country: "한국", year: 2021,
    synopsis: "456억 원의 상금이 걸린 의문의 서바이벌에 참가한 사람들이 최후의 승자가 되기 위해 목숨을 걸고 극한의 게임에 도전하는 과정을 그린 서스펜스 드라마.",
    emoji: "🦑", gradient: "linear-gradient(135deg, #f857a6, #ff5858)"
  },
  {
    id: 7,
    title: "사랑의 불시착",
    type: ["Drama"],
    genres: ["로맨스", "드라마", "코미디"],
    country: "한국", year: 2019,
    synopsis: "패러글라이딩 사고로 북한에 불시착한 재벌 상속녀와 그녀를 지키다 사랑하게 된 특급 장교의 절대 극비 러브스토리.",
    emoji: "🪂", gradient: "linear-gradient(135deg, #ff9966, #ff5e62)"
  },
  {
    id: 8,
    title: "응답하라 1988",
    type: ["Drama"],
    genres: ["드라마", "코미디", "가족"],
    country: "한국", year: 2015,
    synopsis: "1988년 서울 도봉구 쌍문동 골목길에 사는 다섯 가족의 아날로그식 사랑과 우정, 따뜻한 가족 이야기를 그린 코믹 가족 드라마.",
    emoji: "📺", gradient: "linear-gradient(135deg, #4ca1af, #c4e0e5)"
  },
  {
    id: 9,
    title: "비밀의 숲",
    type: ["Drama"],
    genres: ["범죄", "스릴러", "미스터리"],
    country: "한국", year: 2017,
    synopsis: "감정을 느끼지 못하는 검사 황시목과 정의로운 형사 한여진이 함께 검찰 내부 비리를 파헤치는 치밀한 추리 드라마.",
    emoji: "⚖️", gradient: "linear-gradient(135deg, #2c3e50, #3498db)"
  },
  {
    id: 10,
    title: "기묘한 이야기",
    type: ["Drama"],
    genres: ["SF", "미스터리", "스릴러"],
    country: "미국", year: 2016,
    synopsis: "인디애나주 작은 마을에서 소년이 사라지면서 가족과 친구들이 정부의 비밀 실험, 초자연적 힘, 수수께끼 소녀 일레븐과 얽히는 미스터리 스릴러.",
    emoji: "🚲", gradient: "linear-gradient(135deg, #0f0f12, #434343)"
  },
  {
    id: 11,
    title: "브레이킹 배드",
    type: ["Drama"],
    genres: ["범죄", "드라마", "스릴러"],
    country: "미국", year: 2008,
    synopsis: "암 말기 판정을 받은 화학 교사 월터 화이트가 제자와 함께 마약을 제조하며 범죄 세계의 거물이 되어가는 과정.",
    emoji: "🧪", gradient: "linear-gradient(135deg, #11998e, #1d2b64)"
  },

  // 드라마 신규 추가
  {
    id: 50,
    title: "언내추럴",
    type: ["Drama"],
    genres: ["범죄", "미스터리", "의학"],
    country: "일본", year: 2018,
    synopsis: "법의학자 미코토가 소속된 UDI 연구소에서 이상한 사인의 시체들을 부검하며 사회의 어두운 이면을 파헤치는 일본 프라임 타임 최고 시청률 의학 미스터리 드라마.",
    emoji: "🔬", gradient: "linear-gradient(135deg, #1a1a2e, #16213e)"
  },
  {
    id: 51,
    title: "MIU404",
    type: ["Drama"],
    genres: ["범죄", "수사", "버디"],
    country: "일본", year: 2020,
    synopsis: "경시청 기동수사대 404에 소속된 개성 넘치는 두 형사가 짜릿한 버디를 이루며 복잡한 사건들을 해결하는, 캐스팅부터 각본까지 완벽한 일본 버디 형사 드라마.",
    emoji: "🚔", gradient: "linear-gradient(135deg, #373b44, #4286f4)"
  },
  {
    id: 52,
    title: "실연 쇼콜라티에",
    type: ["Drama"],
    genres: ["로맨스", "드라마", "요리"],
    country: "일본", year: 2014,
    synopsis: "짝사랑하던 선배에게 실연당한 청년 소타가 파리에서 쇼콜라티에로 성장한 뒤 귀국해 그녀와 재회하며 얽히는 달콤 쌉싸름한 연애 드라마.",
    emoji: "🍫", gradient: "linear-gradient(135deg, #3c1518, #69140e)"
  },
  {
    id: 53,
    title: "슬기로운 의사생활",
    type: ["Drama"],
    genres: ["드라마", "의학", "우정"],
    country: "한국", year: 2020,
    synopsis: "의대 동창 다섯 명이 각자의 자리에서 의사이자 인간으로서 살아가는 일상을 그린 힐링 메디컬 드라마. 따뜻한 우정과 밴드 활동이 인상적.",
    emoji: "🏥", gradient: "linear-gradient(135deg, #2980b9, #6dd5fa)"
  },
  {
    id: 54,
    title: "더 K2",
    type: ["Drama"],
    genres: ["액션", "로맨스", "스릴러"],
    country: "한국", year: 2016,
    synopsis: "용병 출신 경호원 K2가 정치인의 숨겨진 딸을 경호하며 권력의 음모에 맞서 싸우는 고강도 액션 로맨스 드라마.",
    emoji: "🕵️", gradient: "linear-gradient(135deg, #000428, #004e92)"
  },
  {
    id: 55,
    title: "프렌즈",
    type: ["Drama"],
    genres: ["코미디", "로맨스", "우정"],
    country: "미국", year: 1994,
    synopsis: "뉴욕 맨해튼에 사는 여섯 명의 친구들이 사랑, 직업, 우정을 나누며 살아가는 10년간의 이야기를 담은 미국 역사상 가장 사랑받는 시트콤.",
    emoji: "☕", gradient: "linear-gradient(135deg, #f7971e, #ffd200)"
  },
  {
    id: 56,
    title: "가십걸",
    type: ["Drama"],
    genres: ["드라마", "로맨스", "청춘"],
    country: "미국", year: 2007,
    synopsis: "뉴욕 어퍼이스트사이드의 상류층 10대들의 화려하고 파란만장한 사생활을 익명의 블로거 '가십걸'이 폭로하며 펼쳐지는 스캔들 드라마.",
    emoji: "💄", gradient: "linear-gradient(135deg, #870000, #190000)"
  },

  // ============================================================
  // 📚 만화/웹툰 (기존 유지)
  // ============================================================
  {
    id: 12,
    title: "나 혼자만 레벨업",
    type: ["Manga"],
    genres: ["액션", "판타지", "모험"],
    country: "한국", year: 2018,
    synopsis: "인류 최약병기로 불리던 E급 헌터 성진우가 죽음의 문턱에서 기이한 시스템으로부터 선택받아 홀로 레벨업을 할 수 있는 능력을 얻고 세계관 최강자로 거듭나는 웹툰.",
    emoji: "👑", gradient: "linear-gradient(135deg, #141e30, #243b55)"
  },
  {
    id: 13,
    title: "신의 탑",
    type: ["Manga"],
    genres: ["판타지", "모험", "미스터리"],
    country: "한국", year: 2010,
    synopsis: "자신의 모든 것이었던 소녀 라헬을 쫓아 탑에 들어온 소년 밤이, 탑의 층마다 도사리는 위험한 시험들을 통과하며 동료들을 만나고 탑의 진실을 마주하는 모험 판타지 웹툰.",
    emoji: "🗼", gradient: "linear-gradient(135deg, #fc4a1a, #f7b733)"
  },
  {
    id: 14,
    title: "원피스",
    type: ["Manga"],
    genres: ["모험", "액션", "코미디"],
    country: "일본", year: 1997,
    synopsis: "해적왕을 꿈꾸는 소년 몽키 D. 루피가 동료들을 모아 밀짚모자 해적단을 결성하고, 전설의 보물 '원피스'를 찾아 넓은 바다를 항해하며 겪는 모험과 동료애를 다룬 만화.",
    emoji: "🏴‍☠️", gradient: "linear-gradient(135deg, #2193b0, #6dd5ed)"
  },
  {
    id: 15,
    title: "데스노트",
    type: ["Manga"],
    genres: ["스릴러", "미스터리", "범죄"],
    country: "일본", year: 2003,
    synopsis: "이름을 쓰면 사람이 죽는 사신의 노트 '데스노트'를 주워 악인들을 심판하는 천재 야가미 라이토와 베일에 싸인 명탐정 L 사이의 두뇌 싸움.",
    emoji: "📓", gradient: "linear-gradient(135deg, #0f2027, #203a43)"
  },
  {
    id: 16,
    title: "후레자식",
    type: ["Manga"],
    genres: ["스릴러", "드라마", "범죄"],
    country: "한국", year: 2014,
    synopsis: "평범해 보이는 아버지가 연쇄 살인마라는 비밀을 안고 살아가는 소년 선우진이 아버지의 다음 타깃이 된 전학생을 지키기 위해 맞서는 웰메이드 스릴러 웹툰.",
    emoji: "🔨", gradient: "linear-gradient(135deg, #870000, #190000)"
  },

  // ============================================================
  // 🎬 영화 (신규 추가)
  // ============================================================
  {
    id: 60,
    title: "센과 치히로의 행방불명",
    type: ["Anime", "Movie"],
    genres: ["판타지", "모험", "가족"],
    country: "일본", year: 2001,
    synopsis: "이사 가던 중 신들의 세계에 발을 들여놓게 된 소녀 치히로가 돼지로 변해버린 부모님을 구하고 현실 세계로 돌아가기 위해 온천장에서 일하며 겪는 모험. 아카데미 수상 지브리 명작.",
    emoji: "🐉", gradient: "linear-gradient(135deg, #11998e, #38ef7d)"
  },
  {
    id: 61,
    title: "군함도",
    type: ["Movie"],
    genres: ["역사", "액션", "드라마"],
    country: "한국", year: 2017,
    synopsis: "일제강점기 하시마(군함도)섬의 해저 탄광으로 강제 징용된 조선인들이 목숨을 건 탈출을 감행하는 역사적 대형 액션 드라마.",
    emoji: "⛏️", gradient: "linear-gradient(135deg, #232526, #414345)"
  },
  {
    id: 62,
    title: "부산행",
    type: ["Movie"],
    genres: ["좀비", "액션", "드라마"],
    country: "한국", year: 2016,
    synopsis: "대한민국을 순식간에 뒤덮은 좀비 바이러스 사태 속, 부산행 KTX 안에서 살아남기 위해 사투를 벌이는 사람들의 이야기.",
    emoji: "🚂", gradient: "linear-gradient(135deg, #f857a6, #ff5858)"
  },
  {
    id: 63,
    title: "날씨의 아이",
    type: ["Anime", "Movie"],
    genres: ["판타지", "로맨스", "드라마"],
    country: "일본", year: 2019,
    synopsis: "도쿄로 상경한 소년 호다카가 비를 맑게 개게 하는 신비한 능력을 가진 소녀 히나와 만나 선샤인 걸 사업을 시작하며 얽히는 이야기. 신카이 마코토 감독 작품.",
    emoji: "☀️", gradient: "linear-gradient(135deg, #f7971e, #ffd200)"
  },
  {
    id: 64,
    title: "너의 이름은",
    type: ["Anime", "Movie"],
    genres: ["판타지", "로맨스", "미스터리"],
    country: "일본", year: 2016,
    synopsis: "시골 마을 여고생 미츠하와 도쿄 남고생 타키가 꿈속에서 서로의 몸이 바뀌는 신비한 현상을 겪으며 서로를 향해 나아가는 신카이 마코토 감독의 글로벌 흥행작.",
    emoji: "🌌", gradient: "linear-gradient(135deg, #fc5c7d, #6a82fb)"
  },
  {
    id: 65,
    title: "스즈메의 문단속",
    type: ["Anime", "Movie"],
    genres: ["판타지", "모험", "드라마"],
    country: "일본", year: 2022,
    synopsis: "규슈의 시골 소녀 스즈메가 재난을 일으키는 문들을 닫아야 하는 사명을 진 남자 소타와 함께 일본 전역을 여행하며 닫힌 문들을 봉인하는 모험.",
    emoji: "🚪", gradient: "linear-gradient(135deg, #2b5876, #4e4376)"
  },
  {
    id: 66,
    title: "해운대",
    type: ["Movie"],
    genres: ["재난", "드라마", "액션"],
    country: "한국", year: 2009,
    synopsis: "부산 해운대를 덮친 거대 쓰나미 앞에서 평범한 사람들이 사랑하는 이들을 지키기 위해 사투를 벌이는 한국형 재난 블록버스터.",
    emoji: "🌊", gradient: "linear-gradient(135deg, #1a6db5, #00d2ff)"
  },
  {
    id: 67,
    title: "해리포터와 마법사의 돌",
    type: ["Movie"],
    genres: ["판타지", "모험", "가족"],
    country: "영국", year: 2001,
    synopsis: "평범한 소년인 줄 알았던 해리포터가 호그와트 마법학교에 입학하면서 자신의 운명과 마주하는 전세계를 사로잡은 판타지 시리즈의 시작.",
    emoji: "🧙", gradient: "linear-gradient(135deg, #7b4397, #dc2430)"
  },
  {
    id: 68,
    title: "스파이더맨: 노 웨이 홈",
    type: ["Movie"],
    genres: ["액션", "SF", "모험"],
    country: "미국", year: 2021,
    synopsis: "정체가 세상에 드러난 스파이더맨 피터 파커가 마법을 통해 상황을 되돌리려다 멀티버스의 빌런들을 불러오며 벌어지는 대서사시.",
    emoji: "🕷️", gradient: "linear-gradient(135deg, #c0392b, #8e44ad)"
  },
  {
    id: 69,
    title: "겨울왕국",
    type: ["Movie"],
    genres: ["판타지", "뮤지컬", "가족"],
    country: "미국", year: 2013,
    synopsis: "모든 것을 얼려버리는 마법 능력을 가진 엘사와 그녀를 구하기 위해 떠나는 여동생 안나의 이야기. '렛잇고'로 전세계를 강타한 디즈니 애니메이션.",
    emoji: "❄️", gradient: "linear-gradient(135deg, #4facfe, #00f2fe)"
  },
  {
    id: 70,
    title: "알라딘",
    type: ["Movie"],
    genres: ["판타지", "뮤지컬", "모험"],
    country: "미국", year: 2019,
    synopsis: "아라비안 나이트를 배경으로 마법 램프를 손에 넣은 거리의 청년 알라딘이 지니와 함께 공주 자스민의 마음을 얻기 위해 모험을 펼치는 뮤지컬 어드벤처.",
    emoji: "🪔", gradient: "linear-gradient(135deg, #f7971e, #ffd200)"
  }
];

// LocalStorage 데이터베이스 래퍼 및 상태 관리 모듈
(function() {
  const STORAGE_KEYS = {
    USERS: "media_users",
    WORKS: "media_works",
    REVIEWS: "media_reviews",
    WATCHLIST: "media_watchlist",
    SESSION: "media_current_user"
  };

  // 데이터 버전 — 작품 목록을 변경할 때마다 올려서 캐시 강제 초기화
  const DATA_VERSION = "v3";
  const VERSION_KEY = "media_data_version";

  // 초기 로컬 스토리지 데이터 구성
  function initializeDB() {
    // 1. 버전이 다르면 작품 데이터 강제 갱신 (새 작품이 항상 반영되도록)
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (storedVersion !== DATA_VERSION) {
      localStorage.setItem(STORAGE_KEYS.WORKS, JSON.stringify(window.INITIAL_WORKS || []));
      localStorage.setItem(VERSION_KEY, DATA_VERSION);
    } else if (!localStorage.getItem(STORAGE_KEYS.WORKS)) {
      localStorage.setItem(STORAGE_KEYS.WORKS, JSON.stringify(window.INITIAL_WORKS || []));
    }

    // 2. 사용자 데이터 초기화 (데모용 테스트 계정 포함)
    let users = [];
    if (localStorage.getItem(STORAGE_KEYS.USERS)) {
      users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    }
    
    const hasDemoUser = users.some(u => u.email === "test@test.com");
    if (!hasDemoUser) {
      users.push({
        id: 999,
        email: "test@test.com",
        password: "password123",
        nickname: "콘텐츠덕후"
      });
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    // 3. 리뷰 데이터 초기화 (데모용 리뷰 5개 자동 생성)
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
      const demoReviews = [
        {
          id: 101,
          userId: 999,
          workId: 1, // 귀멸의 칼날
          rating: 5,
          content: "작화와 연출이 소름 돋을 정도로 대단합니다. 탄지로의 성장 스토리도 몰입도가 엄청납니다!",
          date: "2026-05-15"
        },
        {
          id: 102,
          userId: 999,
          workId: 3, // 센과 치히로의 행방불명
          rating: 5,
          content: "어릴 때 봐도, 성인이 되어 다시 봐도 매번 새로운 울림을 주는 인생 최고의 애니메이션.",
          date: "2026-05-20"
        },
        {
          id: 103,
          userId: 999,
          workId: 5, // 장송의 프리렌
          rating: 4,
          content: "용사 사후의 이야기를 잔잔하게 풀어나가며, 삶과 죽음, 인연의 소중함을 느끼게 해주는 수작.",
          date: "2026-06-02"
        },
        {
          id: 104,
          userId: 999,
          workId: 9, // 비밀의 숲
          rating: 5,
          content: "치밀한 각본, 입체적인 캐릭터, 묵직한 메시지까지. 한국 장르물의 정점이라 칭하고 싶습니다.",
          date: "2026-06-10"
        },
        {
          id: 105,
          userId: 999,
          workId: 12, // 나 혼자만 레벨업
          rating: 4,
          content: "원작의 장점을 극한으로 끌어올린 연출. 성장 쾌감이 무엇인지 제대로 보여주는 웹툰.",
          date: "2026-06-18"
        }
      ];
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(demoReviews));
    }

    // 4. 찜 목록 초기화 (데모용 찜 2개 추가)
    if (!localStorage.getItem(STORAGE_KEYS.WATCHLIST)) {
      const demoWatchlist = [
        { userId: 999, workId: 2 }, // 진격의 거인
        { userId: 999, workId: 10 } // 기묘한 이야기
      ];
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(demoWatchlist));
    }
  }

  // 데이터 로드 헬퍼
  function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  // 데이터 저장 헬퍼
  function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // 데이터베이스 인스턴스 정의
  const MediaDB = {
    // DB 초기화 실행
    init: function() {
      initializeDB();
    },

    // 1. 작품 관련 API
    getWorks: function() {
      return getData(STORAGE_KEYS.WORKS);
    },
    getWorkById: function(id) {
      const works = this.getWorks();
      return works.find(w => w.id === parseInt(id)) || null;
    },
    addWork: function(work) {
      const works = this.getWorks();
      const newWork = {
        ...work,
        id: works.length > 0 ? Math.max(...works.map(w => w.id)) + 1 : 1
      };
      works.push(newWork);
      setData(STORAGE_KEYS.WORKS, works);
      return newWork;
    },

    // 2. 리뷰 관련 API
    getAllReviews: function() {
      return getData(STORAGE_KEYS.REVIEWS);
    },
    getReviewsByWork: function(workId) {
      const reviews = this.getAllReviews();
      return reviews.filter(r => r.workId === parseInt(workId));
    },
    getReviewsByUser: function(userId) {
      const reviews = this.getAllReviews();
      return reviews.filter(r => r.userId === parseInt(userId));
    },
    getUserReviewForWork: function(userId, workId) {
      const reviews = this.getAllReviews();
      return reviews.find(r => r.userId === parseInt(userId) && r.workId === parseInt(workId)) || null;
    },
    addOrUpdateReview: function(userId, workId, rating, content) {
      const reviews = this.getAllReviews();
      const existingIndex = reviews.findIndex(r => r.userId === parseInt(userId) && r.workId === parseInt(workId));
      
      const today = new Date().toISOString().split('T')[0];
      
      if (existingIndex > -1) {
        // 기존 리뷰 업데이트
        reviews[existingIndex].rating = parseFloat(rating);
        reviews[existingIndex].content = content;
        reviews[existingIndex].date = today;
      } else {
        // 새 리뷰 생성
        const newReview = {
          id: reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
          userId: parseInt(userId),
          workId: parseInt(workId),
          rating: parseFloat(rating),
          content: content,
          date: today
        };
        reviews.push(newReview);
      }
      
      setData(STORAGE_KEYS.REVIEWS, reviews);
      return true;
    },
    deleteReview: function(userId, workId) {
      let reviews = this.getAllReviews();
      reviews = reviews.filter(r => !(r.userId === parseInt(userId) && r.workId === parseInt(workId)));
      setData(STORAGE_KEYS.REVIEWS, reviews);
      return true;
    },

    // 3. 찜 목록 (Watchlist) API
    getWatchlist: function(userId) {
      const watchlist = getData(STORAGE_KEYS.WATCHLIST);
      const userWatchIds = watchlist.filter(w => w.userId === parseInt(userId)).map(w => w.workId);
      const works = this.getWorks();
      return works.filter(w => userWatchIds.includes(w.id));
    },
    isWatchlisted: function(userId, workId) {
      const watchlist = getData(STORAGE_KEYS.WATCHLIST);
      return watchlist.some(w => w.userId === parseInt(userId) && w.workId === parseInt(workId));
    },
    toggleWatchlist: function(userId, workId) {
      const watchlist = getData(STORAGE_KEYS.WATCHLIST);
      const index = watchlist.findIndex(w => w.userId === parseInt(userId) && w.workId === parseInt(workId));
      let isAdded = false;

      if (index > -1) {
        watchlist.splice(index, 1);
      } else {
        watchlist.push({ userId: parseInt(userId), workId: parseInt(workId) });
        isAdded = true;
      }

      setData(STORAGE_KEYS.WATCHLIST, watchlist);
      return isAdded;
    },

    // 4. 인증 및 사용자 관리 API
    getCurrentUser: function() {
      const session = localStorage.getItem(STORAGE_KEYS.SESSION);
      return session ? JSON.parse(session) : null;
    },
    registerUser: function(email, password, nickname) {
      const users = getData(STORAGE_KEYS.USERS);
      
      // 이메일 중복 체크
      if (users.some(u => u.email === email)) {
        return { success: false, message: "이미 가입된 이메일 주소입니다." };
      }
      
      // 닉네임 중복 체크
      if (users.some(u => u.nickname === nickname)) {
        return { success: false, message: "이미 사용 중인 닉네임입니다." };
      }

      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        email: email,
        password: password,
        nickname: nickname
      };

      users.push(newUser);
      setData(STORAGE_KEYS.USERS, users);
      return { success: true };
    },
    loginUser: function(email, password) {
      const users = getData(STORAGE_KEYS.USERS);
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const sessionUser = { id: user.id, email: user.email, nickname: user.nickname };
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionUser));
        return { success: true, user: sessionUser };
      }
      return { success: false, message: "이메일 또는 비밀번호가 올바르지 않습니다." };
    },
    logoutUser: function() {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      return true;
    },
    updateProfile: function(userId, nickname, newPassword) {
      const users = getData(STORAGE_KEYS.USERS);
      const userIndex = users.findIndex(u => u.id === parseInt(userId));

      if (userIndex === -1) {
        return { success: false, message: "사용자를 찾을 수 없습니다." };
      }

      // 닉네임 중복 검사 (본인 제외)
      if (users.some((u, idx) => idx !== userIndex && u.nickname === nickname)) {
        return { success: false, message: "이미 사용 중인 닉네임입니다." };
      }

      users[userIndex].nickname = nickname;
      if (newPassword) {
        users[userIndex].password = newPassword;
      }

      setData(STORAGE_KEYS.USERS, users);

      // 세션 닉네임 업데이트
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === parseInt(userId)) {
        currentUser.nickname = nickname;
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(currentUser));
      }

      return { success: true, nickname: nickname };
    }
  };

  // 전역 노출
  window.MediaDB = MediaDB;
  MediaDB.init();
})();

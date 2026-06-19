// RECOWAVE Main Application Controller
(function() {
  // DOM 요소 캐싱
  const DOM = {
    // 네비게이션 버튼
    navHome: document.getElementById("nav-btn-home"),
    navSearch: document.getElementById("nav-btn-search"),
    navRecommend: document.getElementById("nav-btn-recommend"),
    navMypage: document.getElementById("nav-btn-mypage"),
    
    // 섹션 컨테이너
    viewHome: document.getElementById("view-home"),
    viewSearch: document.getElementById("view-search"),
    viewDetail: document.getElementById("view-detail"),
    viewRecommend: document.getElementById("view-recommend"),
    viewMypage: document.getElementById("view-mypage"),
    
    // 헤더 영역
    authArea: document.getElementById("auth-header-area"),
    logoArea: document.getElementById("logo-area"),
    
    // 홈 화면 그리드
    homeAnimeGrid: document.getElementById("home-anime-grid"),
    homeDramaGrid: document.getElementById("home-drama-grid"),
    homeMangaGrid: document.getElementById("home-manga-grid"),
    
    // 홈 화면 히어로 액션
    heroStart: document.getElementById("btn-hero-start"),
    heroSearch: document.getElementById("btn-hero-search"),
    
    // 검색 화면 컨트롤
    searchInput: document.getElementById("search-input"),
    btnSearchExecute: document.getElementById("btn-search-execute"),
    filterTypeChips: document.getElementById("filter-type-chips"),
    filterGenreChips: document.getElementById("filter-genre-chips"),
    searchResultsCount: document.getElementById("search-results-count"),
    searchResultsGrid: document.getElementById("search-results-grid"),
    
    // 상세 정보 화면
    btnDetailBack: document.getElementById("btn-detail-back"),
    detailContainer: document.getElementById("detail-content-container"),
    
    // AI 추천 화면
    boardUnauthorized: document.querySelector("#view-recommend .board-unauthorized"),
    boardAuthorized: document.querySelector("#view-recommend .board-authorized"),
    aiStatRecordCount: document.getElementById("ai-stat-record-count"),
    aiStatFavType: document.getElementById("ai-stat-fav-type"),
    aiStatFavGenre: document.getElementById("ai-stat-fav-genre"),
    aiWelcomeSpeech: document.getElementById("ai-welcome-speech"),
    aiRecommendationsList: document.getElementById("ai-recommendations-list"),
    
    // 마이페이지 화면
    mypageUnauthorized: document.getElementById("mypage-unauthorized"),
    mypageAuthorized: document.getElementById("mypage-authorized"),
    mypageUserNickname: document.getElementById("mypage-user-nickname"),
    mypageUserEmail: document.getElementById("mypage-user-email"),
    inputEditNickname: document.getElementById("input-edit-nickname"),
    inputEditPassword: document.getElementById("input-edit-password"),
    btnProfileUpdate: document.getElementById("btn-profile-update"),
    
    // 마이페이지 통계 요약
    mypageStatTotalCount: document.getElementById("mypage-stat-total-count"),
    mypageStatAvgRating: document.getElementById("mypage-stat-avg-rating"),
    mypageStatWatchlistCount: document.getElementById("mypage-stat-watchlist-count"),
    
    // 마이페이지 차트 영역
    chartGenreBars: document.getElementById("chart-genre-bars"),
    chartCountryDonuts: document.getElementById("chart-country-donuts"),
    
    // 마이페이지 탭 및 내용
    tabBtnReviews: document.getElementById("tab-btn-reviews"),
    tabBtnWatchlist: document.getElementById("tab-btn-watchlist"),
    mypageReviewsTab: document.getElementById("mypage-reviews-tab"),
    mypageWatchlistTab: document.getElementById("mypage-watchlist-tab"),
    mypageReviewsList: document.getElementById("mypage-reviews-list"),
    mypageWatchlistGrid: document.getElementById("mypage-watchlist-grid"),
    
    // 1. 인증 모달
    authModal: document.getElementById("auth-modal"),
    btnAuthClose: document.getElementById("btn-auth-close"),
    authLoginBox: document.getElementById("auth-login-box"),
    authSignupBox: document.getElementById("auth-signup-box"),
    formLogin: document.getElementById("form-login"),
    formSignup: document.getElementById("form-signup"),
    loginEmail: document.getElementById("login-email"),
    loginPassword: document.getElementById("login-password"),
    loginErrorMsg: document.getElementById("login-error-msg"),
    signupEmail: document.getElementById("signup-email"),
    signupNickname: document.getElementById("signup-nickname"),
    signupPassword: document.getElementById("signup-password"),
    signupPasswordConfirm: document.getElementById("signup-password-confirm"),
    signupErrorMsg: document.getElementById("signup-error-msg"),
    signupSuccessMsg: document.getElementById("signup-success-msg"),
    btnGoSignup: document.getElementById("btn-go-signup"),
    btnGoLogin: document.getElementById("btn-go-login"),
    
    // 2. 리뷰 작성 모달
    logModal: document.getElementById("log-modal"),
    btnLogClose: document.getElementById("btn-log-close"),
    logModalWorkTitle: document.getElementById("log-modal-work-title"),
    logWorkId: document.getElementById("log-work-id"),
    formLogReview: document.getElementById("form-log-review"),
    logReviewContent: document.getElementById("log-review-content"),
    starRatingText: document.getElementById("star-rating-text")
  };

  // 앱 로컬 상태 관리
  const State = {
    currentUser: null,
    currentView: "home",
    previousView: "home",
    selectedWorkIdForDetail: null,
    searchFilters: {
      type: "all",
      genre: "all",
      query: ""
    },
    activeRating: 0 // 기록 모달 내 현재 별점 상태
  };

  // ==========================================
  // 1. 초기화 및 라우팅 설정
  // ==========================================
  function init() {
    // 1-1. 세션 체크
    State.currentUser = window.MediaDB.getCurrentUser();
    renderHeaderAuthArea();
    
    // 1-2. 공통 이벤트 리스너 등록
    registerEventListeners();
    
    // 1-3. 뷰 초기 렌더링
    renderHomeView();
    setupSearchFilters();
  }

  // 네비게이션 액티브 토글
  function updateNavActiveState(viewName) {
    const navItems = [DOM.navHome, DOM.navSearch, DOM.navRecommend, DOM.navMypage];
    navItems.forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // 뷰 전환 컨트롤러 (SPA 라우터)
  function navigateTo(viewName, params = {}) {
    // 상세 페이지가 아니고 이전 화면으로 갈 수 있게 상태 백업
    if (State.currentView !== "detail") {
      State.previousView = State.currentView;
    }
    
    State.currentView = viewName;
    updateNavActiveState(viewName);

    // 전체 섹션 숨김 처리
    const sections = [DOM.viewHome, DOM.viewSearch, DOM.viewDetail, DOM.viewRecommend, DOM.viewMypage];
    sections.forEach(sec => sec.classList.remove("active"));

    // 특정 뷰 활성화 및 화면 이동 스크롤
    if (viewName === "home") {
      DOM.viewHome.classList.add("active");
      renderHomeView();
    } else if (viewName === "search") {
      DOM.viewSearch.classList.add("active");
      executeSearch(); // 최신 목록 새로고침
    } else if (viewName === "detail") {
      DOM.viewDetail.classList.add("active");
      State.selectedWorkIdForDetail = params.workId;
      renderDetailView(params.workId);
    } else if (viewName === "recommend") {
      DOM.viewRecommend.classList.add("active");
      renderRecommendView();
    } else if (viewName === "mypage") {
      DOM.viewMypage.classList.add("active");
      renderMypageView();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // SEO 메타 타이틀 동적 변경
    const viewTitles = {
      home: "홈 - RECOWAVE",
      search: "작품 검색 - RECOWAVE",
      detail: "작품 상세 - RECOWAVE",
      recommend: "AI 추천 분석 - RECOWAVE",
      mypage: "마이페이지 - RECOWAVE"
    };
    document.title = viewTitles[viewName] || "RECOWAVE - AI 미디어 취향 분석 추천";
  }

  // ==========================================
  // 2. 헤더 및 사용자 세션 관련 렌더러
  // ==========================================
  function renderHeaderAuthArea() {
    if (State.currentUser) {
      DOM.authArea.innerHTML = `
        <div class="header-user-badge">
          <span id="header-username" class="header-user-name">✨ ${State.currentUser.nickname} 님</span>
          <button id="btn-header-logout" class="btn btn-secondary">로그아웃</button>
        </div>
      `;
      // 로그아웃 이벤트 바인딩
      document.getElementById("btn-header-logout").addEventListener("click", handleLogout);
      document.getElementById("header-username").addEventListener("click", () => navigateTo("mypage"));
    } else {
      DOM.authArea.innerHTML = `
        <button id="btn-header-login" class="btn btn-secondary">로그인</button>
        <button id="btn-header-signup" class="btn btn-primary" style="margin-left: 8px;">회원가입</button>
      `;
      document.getElementById("btn-header-login").addEventListener("click", () => openAuthModal("login"));
      document.getElementById("btn-header-signup").addEventListener("click", () => openAuthModal("signup"));
    }
  }

  // ==========================================
  // 3. 카드형 템플릿 생성 헬퍼
  // ==========================================
  function createMediaCardHTML(work) {
    // 해당 작품의 평균 평점 계산
    const reviews = window.MediaDB.getReviewsByWork(work.id);
    const avg = reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
      : "0.0";
    
    return `
      <div class="media-card" data-id="${work.id}">
        <div class="media-poster" style="background: ${work.gradient}">
          <span class="media-type-tag">${getTypeLabelFromWork(work)}</span>
          <span class="poster-emoji">${work.emoji}</span>
        </div>
        <div class="media-info">
          <h4 class="media-title">${work.title}</h4>
          <div class="media-meta-row">
            <span>${work.year} &middot; ${work.country}</span>
            <span class="media-rating">★ ${avg}</span>
          </div>
        </div>
      </div>
    `;
  }

  // type이 문자열 또는 배열 모두를 지원
  function hasType(work, typeKey) {
    if (Array.isArray(work.type)) return work.type.includes(typeKey);
    return work.type === typeKey;
  }

  function getTypeLabelFromWork(work) {
    const types = Array.isArray(work.type) ? work.type : [work.type];
    return types.map(t => ({ Anime: "애니", Drama: "드라마", Manga: "만화/웹툰", Movie: "영화" }[t] || t)).join("·");
  }

  function getTypeLabel(type) {
    const map = { Anime: "애니", Drama: "드라마", Manga: "만화/웹툰", Movie: "영화" };
    return map[type] || type;
  }

  // ==========================================
  // 4. 홈 뷰 렌더링
  // ==========================================
  function renderHomeView() {
    const works = window.MediaDB.getWorks();
    
    // 카테고리별 분할 (복수 type 배열 지원)
    const animes = works.filter(w => hasType(w, "Anime"));
    const dramas = works.filter(w => hasType(w, "Drama"));
    const mangas = works.filter(w => hasType(w, "Manga"));
    const movies = works.filter(w => hasType(w, "Movie"));

    DOM.homeAnimeGrid.innerHTML = animes.map(w => createMediaCardHTML(w)).join("");
    DOM.homeDramaGrid.innerHTML = dramas.map(w => createMediaCardHTML(w)).join("");
    DOM.homeMangaGrid.innerHTML = mangas.map(w => createMediaCardHTML(w)).join("");

    // 영화 그리드가 HTML에 있으면 채우기
    const movieGrid = document.getElementById("home-movie-grid");
    if (movieGrid) movieGrid.innerHTML = movies.map(w => createMediaCardHTML(w)).join("");

    // 카드 클릭 이벤트 바인딩
    const cards = document.querySelectorAll("#view-home .media-card");
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        navigateTo("detail", { workId: id });
      });
    });
  }

  // ==========================================
  // 5. 검색 및 필터 뷰 렌더링
  // ==========================================
  function setupSearchFilters() {
    const works = window.MediaDB.getWorks();
    
    // 고유 장르 세트 수집
    const allGenres = new Set();
    works.forEach(w => w.genres.forEach(g => allGenres.add(g)));
    
    DOM.filterGenreChips.innerHTML = `
      <button class="chip active" data-genre="all">전체 장르</button>
      ${Array.from(allGenres).map(genre => `<button class="chip" data-genre="${genre}">${genre}</button>`).join("")}
    `;

    // 칩 인터랙션 바인딩
    DOM.filterTypeChips.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        DOM.filterTypeChips.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        State.searchFilters.type = chip.dataset.type;
        executeSearch();
      });
    });

    DOM.filterGenreChips.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      DOM.filterGenreChips.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      State.searchFilters.genre = chip.dataset.genre;
      executeSearch();
    });

    // 실시간 검색어 바인딩
    DOM.searchInput.addEventListener("input", (e) => {
      State.searchFilters.query = e.target.value;
      executeSearch();
    });
  }

  function executeSearch() {
    const works = window.MediaDB.getWorks();
    const { type, genre, query } = State.searchFilters;

    const filtered = works.filter(work => {
      // 1. 미디어타입 체크 (배열 type 지원)
      if (type !== "all" && !hasType(work, type)) return false;
      
      // 2. 장르 체크
      if (genre !== "all" && !work.genres.includes(genre)) return false;
      
      // 3. 검색 쿼리 체크
      if (query.trim() !== "") {
        const q = query.toLowerCase();
        const titleMatch = work.title.toLowerCase().includes(q);
        const synopsisMatch = work.synopsis.toLowerCase().includes(q);
        if (!titleMatch && !synopsisMatch) return false;
      }

      return true;
    });

    // 결과 렌더링
    DOM.searchResultsCount.textContent = `검색 결과 ${filtered.length}건`;
    
    if (filtered.length > 0) {
      DOM.searchResultsGrid.innerHTML = filtered.map(w => createMediaCardHTML(w)).join("");
      DOM.searchResultsGrid.querySelectorAll(".media-card").forEach(card => {
        card.addEventListener("click", () => {
          navigateTo("detail", { workId: card.dataset.id });
        });
      });
    } else {
      DOM.searchResultsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: var(--text-muted);">
          🔍 매칭되는 작품이 없습니다. 다른 키워드를 입력해 보세요.
        </div>
      `;
    }
  }

  // ==========================================
  // 6. 작품 상세 페이지 렌더링
  // ==========================================
  function renderDetailView(workId) {
    const work = window.MediaDB.getWorkById(workId);
    if (!work) {
      DOM.detailContainer.innerHTML = `<p>존재하지 않는 작품입니다.</p>`;
      return;
    }

    // 평균 평점 및 리뷰 리스트 가져오기
    const reviews = window.MediaDB.getReviewsByWork(workId);
    const avgRating = reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";
    
    // 찜하기 버튼 활성화 상태 조회
    const isWatch = State.currentUser ? window.MediaDB.isWatchlisted(State.currentUser.id, work.id) : false;
    
    // 감상 로그 버튼 텍스트 정의
    let logBtnText = "감상 기록 및 평점 등록";
    if (State.currentUser) {
      const userRev = window.MediaDB.getUserReviewForWork(State.currentUser.id, work.id);
      if (userRev) {
        logBtnText = `내 평가 수정하기 (★ ${userRev.rating})`;
      }
    }

    // HTML 본문 조립
    let html = `
      <!-- 왼쪽 영역: 포스터 및 액션 -->
      <div class="detail-left">
        <div class="detail-poster-large" style="background: ${work.gradient}">
          <span class="media-type-tag">${getTypeLabelFromWork(work)}</span>
          <span class="poster-emoji">${work.emoji}</span>
        </div>
        <div class="detail-actions">
          <button id="btn-log-trigger" class="btn btn-primary btn-block">🍿 ${logBtnText}</button>
          <button id="btn-watchlist-toggle" class="btn btn-secondary btn-block btn-watchlist-toggle ${isWatch ? 'active' : ''}">
            ${isWatch ? '❤️ 찜 목록에서 삭제' : '🤍 찜 목록에 추가'}
          </button>
        </div>
      </div>

      <!-- 오른쪽 영역: 메인 정보 및 감상평 목록 -->
      <div class="detail-right">
        <div class="detail-header-info">
          <h2>${work.title}</h2>
          <div class="detail-meta-tags">
            <span class="meta-tag">${work.year}년</span>
            <span class="meta-tag">${work.country}</span>
            <span class="meta-tag">${getTypeLabelFromWork(work)}</span>
            ${work.genres.map(g => `<span class="meta-tag" style="border-color: rgba(168,85,247,0.3); color: var(--color-primary);">${g}</span>`).join("")}
          </div>
        </div>

        <!-- 평점 및 통계 지표 -->
        <div class="detail-stats-box">
          <div class="detail-stat-item">
            <span class="detail-stat-label">RECOWAVE 평균 평점</span>
            <span class="detail-stat-val"><span class="star-colored">★</span> ${avgRating}</span>
          </div>
          <div class="detail-stat-item">
            <span class="detail-stat-label">작성된 리뷰</span>
            <span class="detail-stat-val">${reviews.length}개</span>
          </div>
        </div>

        <!-- 줄거리 -->
        <div class="detail-synopsis">
          <h3 class="detail-section-title">줄거리</h3>
          <p>${work.synopsis}</p>
        </div>

        <!-- 작성된 리뷰 섹션 -->
        <div class="reviews-section">
          <h3 class="detail-section-title">사람들의 감상평</h3>
          <div class="reviews-list">
            ${reviews.length > 0 ? reviews.map(rev => `
              <div class="review-item-card glass-card">
                <div class="review-item-header">
                  <div class="review-author-info">
                    <div class="review-avatar">${rev.nickname ? rev.nickname.substring(0,1) : "👤"}</div>
                    <span class="review-nickname">${rev.nickname || '익명 회원'}</span>
                  </div>
                  <span class="review-rating-stars">${getStarsHTML(rev.rating)}</span>
                </div>
                <p class="review-item-content">${rev.content || '평점만 매긴 리뷰입니다.'}</p>
                <div style="text-align: right;"><span class="review-date">${rev.date}</span></div>
              </div>
            `).join("") : `
              <div class="no-reviews-placeholder glass-card">
                아직 작성된 리뷰가 없습니다. 첫 번째로 이 작품에 평가를 등록해보세요!
              </div>
            `}
          </div>
        </div>
      </div>
    `;

    DOM.detailContainer.innerHTML = html;

    // 이벤트 리스너 바인딩
    document.getElementById("btn-watchlist-toggle").addEventListener("click", () => {
      if (!State.currentUser) {
        alert("찜하기 기능을 이용하려면 먼저 로그인해 주세요.");
        openAuthModal("login");
        return;
      }
      const added = window.MediaDB.toggleWatchlist(State.currentUser.id, work.id);
      renderDetailView(work.id); // 갱신
    });

    document.getElementById("btn-log-trigger").addEventListener("click", () => {
      if (!State.currentUser) {
        alert("감상 기록 등록을 하려면 먼저 로그인해 주세요.");
        openAuthModal("login");
        return;
      }
      openLogModal(work);
    });
  }

  // ==========================================
  // 7. AI 추천 뷰 렌더링
  // ==========================================
  function renderRecommendView() {
    if (!State.currentUser) {
      DOM.boardUnauthorized.classList.remove("hide");
      DOM.boardAuthorized.classList.add("hide");
      DOM.aiRecommendationsList.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          🔒 로그인하시면 개인 맞춤 AI 분석 추천 리스트가 활성화됩니다.
        </div>
      `;
      return;
    }

    DOM.boardUnauthorized.classList.add("hide");
    DOM.boardAuthorized.classList.remove("hide");

    // AI 가중치 추천 리스트 생성
    const recs = window.AIRecommendation.getRecommendations(State.currentUser.id);
    const userReviews = window.MediaDB.getReviewsByUser(State.currentUser.id);
    const highRatedReviews = userReviews.filter(r => r.rating >= 4);

    // 요약 헤더 채우기
    DOM.aiStatRecordCount.textContent = `${userReviews.length}개`;
    
    // 취향 분석 텍스트 생성
    if (highRatedReviews.length > 0) {
      // 선호 장르 1순위 찾기
      const genreCounts = {};
      let favTypeCounts = {};
      
      highRatedReviews.forEach(r => {
        const w = window.MediaDB.getWorkById(r.workId);
        if (w) {
          w.genres.forEach(g => genreCounts[g] = (genreCounts[g] || 0) + 1);
          favTypeCounts[w.type] = (favTypeCounts[w.type] || 0) + 1;
        }
      });

      const topGenre = Object.entries(genreCounts).sort((a,b)=>b[1]-a[1])[0];
      const topType = Object.entries(favTypeCounts).sort((a,b)=>b[1]-a[1])[0];
      const typeMap = { Anime: "애니메이션", Drama: "드라마", Manga: "만화/웹툰" };

      DOM.aiStatFavType.textContent = topType ? typeMap[topType[0]] : "-";
      DOM.aiStatFavGenre.textContent = topGenre ? topGenre[0] : "-";
      
      DOM.aiWelcomeSpeech.innerHTML = `
        사용자님의 감상 이력을 종합적으로 분석했습니다.<br>
        가장 즐겨보시는 미디어는 <strong>[${topType ? typeMap[topType[0]] : '기록없음'}]</strong>이며, 
        가장 선호도가 높은 장르는 <strong>[${topGenre ? topGenre[0] : '기록없음'}]</strong>입니다. 
        사용자님의 주입된 가중치와 유사도가 가장 밀접한 추천 목록입니다.
      `;
    } else {
      DOM.aiStatFavType.textContent = "기록 부족";
      DOM.aiStatFavGenre.textContent = "기록 부족";
      DOM.aiWelcomeSpeech.textContent = "평가 정보가 부족하여 대중적인 평점이 우수한 웰메이드 작품들을 모아 추천해 드립니다. 평점 4~5점 기록을 늘려보세요!";
    }

    // 추천 리스트 렌더링
    if (recs.length > 0) {
      DOM.aiRecommendationsList.innerHTML = recs.map(item => `
        <div class="recommend-item-card glass-card">
          <div class="recommend-poster-wrapper" data-id="${item.work.id}">
            <div class="media-poster" style="background: ${item.work.gradient}">
              <span class="media-type-tag">${getTypeLabel(item.work.type)}</span>
              <span class="poster-emoji">${item.work.emoji}</span>
            </div>
            <div class="recommend-match-badge">일치도 ${item.score}</div>
          </div>
          <div class="recommend-info-box">
            <h4 class="recommend-item-title" data-id="${item.work.id}">${item.work.title}</h4>
            <div class="media-meta-row" style="margin-bottom: 8px;">
              <span>${item.work.year} &middot; ${item.work.country}</span>
            </div>
            <p class="recommend-reason-text">🤖 ${item.reason}</p>
          </div>
        </div>
      `).join("");

      // 이벤트 바인딩
      DOM.aiRecommendationsList.querySelectorAll(".recommend-poster-wrapper, .recommend-item-title").forEach(el => {
        el.addEventListener("click", () => {
          navigateTo("detail", { workId: el.dataset.id });
        });
      });
    } else {
      DOM.aiRecommendationsList.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          추천해 드릴 수 있는 미감상 작품이 데이터베이스에 더 이상 없습니다. 새로운 작품을 등록해보세요!
        </div>
      `;
    }
  }

  // ==========================================
  // 8. 마이페이지 뷰 및 차트 렌더링
  // ==========================================
  function renderMypageView() {
    if (!State.currentUser) {
      DOM.mypageUnauthorized.classList.remove("hide");
      DOM.mypageAuthorized.classList.add("hide");
      return;
    }

    DOM.mypageUnauthorized.classList.add("hide");
    DOM.mypageAuthorized.classList.remove("hide");

    // 기본 프로필 정보 주입
    DOM.mypageUserNickname.textContent = State.currentUser.nickname;
    DOM.mypageUserEmail.textContent = State.currentUser.email;
    DOM.inputEditNickname.value = State.currentUser.nickname;
    DOM.inputEditPassword.value = ""; // 초기화

    // 사용자 데이터 로드
    const myReviews = window.MediaDB.getReviewsByUser(State.currentUser.id);
    const myWatchlist = window.MediaDB.getWatchlist(State.currentUser.id);

    // 8-1. 요약 통계값 계산 및 출력
    const avgRating = myReviews.length > 0
      ? (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)
      : "0.0";
    
    DOM.mypageStatTotalCount.textContent = myReviews.length;
    DOM.mypageStatAvgRating.textContent = avgRating;
    DOM.mypageStatWatchlistCount.textContent = myWatchlist.length;

    // 8-2. 장르별 비율 계산 및 CSS 가로 바 차트 렌더링
    renderGenreBarChart(myReviews);

    // 8-3. 제작 국가별 비율 계산 및 CSS 도넛 차트 렌더링
    renderCountryDonutCharts(myReviews);

    // 8-4. 리뷰 및 찜목록 탭 컨텐츠 렌더링
    renderMypageReviewsList(myReviews);
    renderMypageWatchlistGrid(myWatchlist);
  }

  // 8-2-1. 장르별 바 차트 렌더러
  function renderGenreBarChart(reviews) {
    if (reviews.length === 0) {
      DOM.chartGenreBars.innerHTML = `<p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px 0;">평가 내역이 없어 분석할 수 없습니다.</p>`;
      return;
    }

    const genreCounts = {};
    reviews.forEach(rev => {
      const work = window.MediaDB.getWorkById(rev.workId);
      if (work) {
        work.genres.forEach(genre => {
          genreCounts[genre] = (genreCounts[genre] || 0) + 1;
        });
      }
    });

    // 장르 정렬
    const sortedGenres = Object.entries(genreCounts).sort((a,b) => b[1] - a[1]).slice(0, 4);
    
    // 전체 대비 점유율 계산용 총합수 구하기
    const totalGenresCount = Object.values(genreCounts).reduce((sum, v) => sum + v, 0);

    let html = sortedGenres.map(([genre, count]) => {
      const percentage = Math.round((count / totalGenresCount) * 100);
      return `
        <div class="bar-chart-row">
          <div class="bar-label-area">
            <span class="bar-name">${genre}</span>
            <span class="bar-percent-val">${percentage}% (${count}회)</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: ${percentage}%"></div>
          </div>
        </div>
      `;
    }).join("");

    DOM.chartGenreBars.innerHTML = html;
  }

  // 8-3-1. 국가별 도넛 차트 렌더러
  function renderCountryDonutCharts(reviews) {
    if (reviews.length === 0) {
      DOM.chartCountryDonuts.innerHTML = `<p style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px 0;">평가 내역이 없어 분석할 수 없습니다.</p>`;
      return;
    }

    const countryCounts = {};
    reviews.forEach(rev => {
      const work = window.MediaDB.getWorkById(rev.workId);
      if (work) {
        countryCounts[work.country] = (countryCounts[work.country] || 0) + 1;
      }
    });

    // 비율 도넛 차트 렌더링용 퍼센트
    const totalCount = reviews.length;
    let colors = ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)"];

    let html = Object.entries(countryCounts)
      .sort((a,b) => b[1] - a[1])
      .slice(0, 3) // 상위 3개 국가
      .map(([country, count], idx) => {
        const percentage = Math.round((count / totalCount) * 100);
        const color = colors[idx] || "#71717a";
        
        return `
          <div class="donut-item">
            <div class="conic-gauge" style="background: conic-gradient(${color} 0% ${percentage}%, rgba(255,255,255,0.05) ${percentage}% 100%)">
              <div class="conic-gauge-inner">${percentage}%</div>
            </div>
            <span class="donut-label">${country} (${count}개)</span>
          </div>
        `;
      }).join("");

    DOM.chartCountryDonuts.innerHTML = html;
  }

  // 8-4-1. 마이페이지 내가 작성한 리뷰 탭
  function renderMypageReviewsList(reviews) {
    if (reviews.length === 0) {
      DOM.mypageReviewsList.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 40px 0;">아직 작성한 평점 및 리뷰가 없습니다.</p>`;
      return;
    }

    let html = reviews.map(rev => {
      const work = window.MediaDB.getWorkById(rev.workId);
      if (!work) return "";

      return `
        <div class="mypage-review-card glass-card" data-workid="${work.id}">
          <div class="mypage-review-poster" style="background: ${work.gradient}">
            <span class="poster-emoji" style="font-size: 28px;">${work.emoji}</span>
          </div>
          <div class="mypage-review-body">
            <h4 class="mypage-review-title" data-id="${work.id}">${work.title}</h4>
            <div class="mypage-review-meta">
              <span>${getStarsHTML(rev.rating)}</span> &middot; 
              <span>${rev.date}</span>
            </div>
            <p class="mypage-review-text">${rev.content || '평점만 매긴 기록입니다.'}</p>
          </div>
          <div class="mypage-review-actions">
            <button class="btn btn-secondary btn-review-edit" data-id="${work.id}" style="padding: 6px 12px; font-size: 12px;">수정</button>
            <button class="btn btn-secondary btn-review-delete" data-id="${work.id}" style="padding: 6px 12px; font-size: 12px; color: var(--color-accent); border-color: rgba(244,63,94,0.2);">삭제</button>
          </div>
        </div>
      `;
    }).join("");

    DOM.mypageReviewsList.innerHTML = html;

    // 리뷰 수정/삭제 이벤트 위임 바인딩
    DOM.mypageReviewsList.querySelectorAll(".mypage-review-title").forEach(title => {
      title.addEventListener("click", () => {
        navigateTo("detail", { workId: title.dataset.id });
      });
    });

    DOM.mypageReviewsList.querySelectorAll(".btn-review-edit").forEach(btn => {
      btn.addEventListener("click", () => {
        const work = window.MediaDB.getWorkById(btn.dataset.id);
        openLogModal(work);
      });
    });

    DOM.mypageReviewsList.querySelectorAll(".btn-review-delete").forEach(btn => {
      btn.addEventListener("click", () => {
        if (confirm("정말 이 감상 기록을 삭제하시겠습니까?")) {
          window.MediaDB.deleteReview(State.currentUser.id, btn.dataset.id);
          renderMypageView(); // 갱신
        }
      });
    });
  }

  // 8-4-2. 마이페이지 찜한 작품 탭
  function renderMypageWatchlistGrid(watchlist) {
    if (watchlist.length === 0) {
      DOM.mypageWatchlistGrid.innerHTML = `<p style="grid-column:1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">찜한 작품이 없습니다.</p>`;
      return;
    }

    DOM.mypageWatchlistGrid.innerHTML = watchlist.map(w => createMediaCardHTML(w)).join("");
    
    // 이벤트 바인딩
    DOM.mypageWatchlistGrid.querySelectorAll(".media-card").forEach(card => {
      card.addEventListener("click", () => {
        navigateTo("detail", { workId: card.dataset.id });
      });
    });
  }

  // ==========================================
  // 9. 모달 제어 및 서브미션 로직
  // ==========================================
  
  // 9-1. 로그인/가입 모달 열기
  function openAuthModal(mode = "login") {
    DOM.authModal.classList.remove("hide");
    DOM.loginErrorMsg.textContent = "";
    DOM.signupErrorMsg.textContent = "";
    DOM.signupSuccessMsg.textContent = "";
    
    if (mode === "login") {
      DOM.authLoginBox.classList.remove("hide");
      DOM.authSignupBox.classList.add("hide");
    } else {
      DOM.authLoginBox.classList.add("hide");
      DOM.authSignupBox.classList.remove("hide");
    }
  }

  // 9-2. 감상평 등록 모달 열기
  function openLogModal(work) {
    DOM.logModal.classList.remove("hide");
    DOM.logWorkId.value = work.id;
    DOM.logModalWorkTitle.textContent = work.title;
    
    // 이전 기록이 있는 경우 주입
    const existing = window.MediaDB.getUserReviewForWork(State.currentUser.id, work.id);
    if (existing) {
      State.activeRating = existing.rating;
      DOM.logReviewContent.value = existing.content;
      DOM.starRatingText.textContent = `${existing.rating}점 - 아주 좋아요!`;
    } else {
      State.activeRating = 0;
      DOM.logReviewContent.value = "";
      DOM.starRatingText.textContent = "별점을 선택하세요";
    }

    updateModalStarsRendering(State.activeRating);
  }

  // 별점 렌더링 헬퍼 (반별 지원)
  function updateModalStarsRendering(rating, isHover = false) {
    const starParts = DOM.formLogReview.querySelectorAll(".star-part");
    starParts.forEach(part => {
      const val = parseFloat(part.dataset.val);
      if (val <= rating) {
        part.classList.add("active");
      } else {
        part.classList.remove("active");
      }
    });

    const labels = {
      0: "별점을 선택하세요",
      0.5: "0.5점 - 최악이에요",
      1.0: "1.0점 - 많이 아쉬워요",
      1.5: "1.5점 - 아쉬운 점이 많아요",
      2.0: "2.0점 - 조금 아쉬워요",
      2.5: "2.5점 - 평균 이하예요",
      3.0: "3.0점 - 보통이에요 / 볼만해요",
      3.5: "3.5점 - 괜찮은 편이에요",
      4.0: "4.0점 - 재미있고 추천해요",
      4.5: "4.5점 - 매우 훌륭한 작품이에요",
      5.0: "5.0점 - 제 인생작입니다! ✨"
    };
    
    const labelText = labels[rating] || `${rating}점`;
    DOM.starRatingText.textContent = isHover ? `${labelText} (선택 중...)` : labelText;
  }

  // 읽기 전용 별점 표시용 HTML 빌더 (반별 지원)
  function getStarsHTML(rating) {
    let html = '<div class="star-rating-display">';
    const parsedRating = parseFloat(rating);
    for (let i = 1; i <= 5; i++) {
      if (parsedRating >= i) {
        html += '<span class="star-filled">★</span>';
      } else if (parsedRating >= i - 0.5) {
        html += '<span class="star-half">★</span>';
      } else {
        html += '<span class="star-empty">★</span>';
      }
    }
    html += '</div>';
    return html;
  }

  // ==========================================
  // 10. 이벤트 리스너 일괄 핸들러 등록
  // ==========================================
  function registerEventListeners() {
    
    // 네비게이션 라우팅 바인딩
    DOM.logoArea.addEventListener("click", () => navigateTo("home"));
    DOM.navHome.addEventListener("click", () => navigateTo("home"));
    DOM.navSearch.addEventListener("click", () => navigateTo("search"));
    DOM.navRecommend.addEventListener("click", () => navigateTo("recommend"));
    DOM.navMypage.addEventListener("click", () => navigateTo("mypage"));
    
    // 히어로 액션 버튼
    DOM.heroStart.addEventListener("click", () => {
      if (State.currentUser) {
        navigateTo("search");
      } else {
        openAuthModal("signup");
      }
    });
    DOM.heroSearch.addEventListener("click", () => navigateTo("search"));
    DOM.btnSearchExecute.addEventListener("click", () => executeSearch());

    // 뒤로 가기
    DOM.btnDetailBack.addEventListener("click", () => {
      navigateTo(State.previousView);
    });

    // 찜하기 버튼 경고 및 트리거
    DOM.viewRecommend.querySelector(".btn-auth-trigger").addEventListener("click", () => openAuthModal("login"));
    DOM.mypageUnauthorized.querySelector(".btn-auth-trigger").addEventListener("click", () => openAuthModal("login"));

    // ------------------------------------
    // 모달창 닫기 이벤트
    // ------------------------------------
    DOM.btnAuthClose.addEventListener("click", () => DOM.authModal.classList.add("hide"));
    DOM.btnLogClose.addEventListener("click", () => DOM.logModal.classList.add("hide"));
    
    // 오버레이 클릭 시 닫기
    DOM.authModal.addEventListener("click", (e) => {
      if (e.target === DOM.authModal) DOM.authModal.classList.add("hide");
    });
    DOM.logModal.addEventListener("click", (e) => {
      if (e.target === DOM.logModal) DOM.logModal.classList.add("hide");
    });

    // 가입/로그인 토글 링크
    DOM.btnGoSignup.addEventListener("click", () => openAuthModal("signup"));
    DOM.btnGoLogin.addEventListener("click", () => openAuthModal("login"));

    // ------------------------------------
    // 폼 서브미션 처리
    // ------------------------------------
    
    // 로그인 완료 핸들러
    DOM.formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = DOM.loginEmail.value.trim();
      const pwd = DOM.loginPassword.value;

      const res = window.MediaDB.loginUser(email, pwd);
      if (res.success) {
        State.currentUser = res.user;
        renderHeaderAuthArea();
        DOM.authModal.classList.add("hide");
        DOM.loginEmail.value = "";
        DOM.loginPassword.value = "";
        
        // 현재 로그인에 의존하는 화면들 갱신
        if (State.currentView === "recommend") renderRecommendView();
        if (State.currentView === "mypage") renderMypageView();
        if (State.currentView === "detail") renderDetailView(State.selectedWorkIdForDetail);
      } else {
        DOM.loginErrorMsg.textContent = res.message;
      }
    });

    // 회원가입 완료 핸들러
    DOM.formSignup.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = DOM.signupEmail.value.trim();
      const nickname = DOM.signupNickname.value.trim();
      const pwd = DOM.signupPassword.value;
      const pwdConfirm = DOM.signupPasswordConfirm.value;

      DOM.signupErrorMsg.textContent = "";
      DOM.signupSuccessMsg.textContent = "";

      // 1. 유효성 검사
      if (pwd.length < 6) {
        DOM.signupErrorMsg.textContent = "비밀번호는 최소 6자 이상이어야 합니다.";
        return;
      }
      if (pwd !== pwdConfirm) {
        DOM.signupErrorMsg.textContent = "비밀번호가 일치하지 않습니다.";
        return;
      }

      // 2. DB 저장
      const res = window.MediaDB.registerUser(email, pwd, nickname);
      if (res.success) {
        DOM.signupSuccessMsg.textContent = "회원가입이 완료되었습니다! 잠시 후 로그인 창으로 이동합니다.";
        DOM.signupEmail.value = "";
        DOM.signupNickname.value = "";
        DOM.signupPassword.value = "";
        DOM.signupPasswordConfirm.value = "";
        
        setTimeout(() => {
          openAuthModal("login");
        }, 1500);
      } else {
        DOM.signupErrorMsg.textContent = res.message;
      }
    });

    // 별점 마우스 호버 및 클릭 처리 (반별 지원)
    const starParts = DOM.formLogReview.querySelectorAll(".star-part");
    const starSelector = DOM.formLogReview.querySelector(".star-rating-selector");

    starParts.forEach(part => {
      part.addEventListener("click", () => {
        const val = parseFloat(part.dataset.val);
        State.activeRating = val;
        updateModalStarsRendering(val);
      });

      part.addEventListener("mouseover", () => {
        const val = parseFloat(part.dataset.val);
        updateModalStarsRendering(val, true);
      });
    });

    starSelector.addEventListener("mouseleave", () => {
      updateModalStarsRendering(State.activeRating);
    });

    // 감상평 저장 핸들러
    DOM.formLogReview.addEventListener("submit", (e) => {
      e.preventDefault();
      const workId = parseInt(DOM.logWorkId.value);
      const rating = State.activeRating;
      const content = DOM.logReviewContent.value.trim();

      if (rating === 0) {
        alert("별점을 최소 1점 이상 선택해 주세요.");
        return;
      }

      // 작성자 닉네임과 함께 리뷰를 DB에 저장
      const db = window.MediaDB;
      const reviews = db.getAllReviews();
      
      const existingIndex = reviews.findIndex(r => r.userId === State.currentUser.id && r.workId === workId);
      const today = new Date().toISOString().split('T')[0];

      if (existingIndex > -1) {
        reviews[existingIndex].rating = rating;
        reviews[existingIndex].content = content;
        reviews[existingIndex].date = today;
        reviews[existingIndex].nickname = State.currentUser.nickname; // 닉네임 보강
      } else {
        const newReview = {
          id: reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
          userId: State.currentUser.id,
          nickname: State.currentUser.nickname, // 닉네임 저장
          workId: workId,
          rating: rating,
          content: content,
          date: today
        };
        reviews.push(newReview);
      }
      
      localStorage.setItem("media_reviews", JSON.stringify(reviews));

      // 모달 닫기 및 리로드
      DOM.logModal.classList.add("hide");
      
      if (State.currentView === "detail") {
        renderDetailView(workId);
      }
      if (State.currentView === "mypage") {
        renderMypageView();
      }
    });

    // ------------------------------------
    // 마이페이지 프로필 수정
    // ------------------------------------
    DOM.btnProfileUpdate.addEventListener("click", () => {
      const newNickname = DOM.inputEditNickname.value.trim();
      const newPwd = DOM.inputEditPassword.value;

      if (!newNickname) {
        alert("닉네임을 입력해 주세요.");
        return;
      }

      const res = window.MediaDB.updateProfile(State.currentUser.id, newNickname, newPwd);
      if (res.success) {
        State.currentUser.nickname = res.nickname;
        renderHeaderAuthArea();
        renderMypageView();
        alert("프로필 정보가 수정되었습니다.");
      } else {
        alert(res.message);
      }
    });

    // ------------------------------------
    // 마이페이지 서브 탭 전환
    // ------------------------------------
    DOM.tabBtnReviews.addEventListener("click", () => {
      DOM.tabBtnReviews.classList.add("active");
      DOM.tabBtnWatchlist.classList.remove("active");
      DOM.mypageReviewsTab.classList.add("active");
      DOM.mypageWatchlistTab.classList.remove("active");
    });

    DOM.tabBtnWatchlist.addEventListener("click", () => {
      DOM.tabBtnReviews.classList.remove("active");
      DOM.tabBtnWatchlist.classList.add("active");
      DOM.mypageReviewsTab.classList.remove("active");
      DOM.mypageWatchlistTab.classList.add("active");
    });
  }

  // 로그아웃 핸들러
  function handleLogout() {
    if (confirm("로그아웃 하시겠습니까?")) {
      window.MediaDB.logoutUser();
      State.currentUser = null;
      renderHeaderAuthArea();
      
      // 관련 뷰 상태 초기화 및 홈으로 이동
      if (State.currentView === "recommend" || State.currentView === "mypage") {
        navigateTo("home");
      } else if (State.currentView === "detail") {
        renderDetailView(State.selectedWorkIdForDetail);
      }
    }
  }

  // 앱 시동
  init();
})();

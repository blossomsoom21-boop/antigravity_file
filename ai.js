// AI 취향 분석 및 추천 모듈
(function() {
  const AIRecommendation = {
    // 추천 리스트 생성
    getRecommendations: function(userId) {
      const db = window.MediaDB;
      if (!db) return [];

      const allWorks = db.getWorks();
      const userReviews = db.getReviewsByUser(userId);
      
      // 사용자가 남긴 4점 이상의 평점 필터링 (취향 기준)
      const highRatedReviews = userReviews.filter(r => r.rating >= 4);
      
      // 이미 본 작품 ID 목록
      const watchedWorkIds = userReviews.map(r => r.workId);

      // 만약 고평가한 작품이 없거나 리뷰 개수가 적을 때의 폴백 (인기작 추천)
      if (highRatedReviews.length === 0) {
        return this.getFallbackRecommendations(allWorks, watchedWorkIds);
      }

      // 1. 선호 데이터 가중치 계산 (장르, 국가, 타입)
      const genreWeights = {};
      const countryWeights = {};
      const typeWeights = {};

      highRatedReviews.forEach(review => {
        const work = db.getWorkById(review.workId);
        if (!work) return;

        // 평점에 비례해 가중치 가산 (5점 -> 2점 기여, 4점 -> 1점 기여)
        const weightValue = review.rating - 3;

        // 장르별 가중치 누적
        work.genres.forEach(genre => {
          genreWeights[genre] = (genreWeights[genre] || 0) + weightValue;
        });

        // 국가별 가중치 누적
        countryWeights[work.country] = (countryWeights[work.country] || 0) + weightValue;

        // 타입별 가중치 누적 (배열 type 지원)
        const workTypes = Array.isArray(work.type) ? work.type : [work.type];
        workTypes.forEach(t => {
          typeWeights[t] = (typeWeights[t] || 0) + weightValue;
        });
      });

      // 2. 가중치가 높은 정렬 리스트 생성 (추천 사유 동적 생성용)
      const favoriteGenres = Object.entries(genreWeights).sort((a, b) => b[1] - a[1]).map(e => e[0]);
      const favoriteCountries = Object.entries(countryWeights).sort((a, b) => b[1] - a[1]).map(e => e[0]);
      const favoriteTypes = Object.entries(typeWeights).sort((a, b) => b[1] - a[1]).map(e => e[0]);

      // 3. 미감상 작품 대상 스코어링
      const recommendations = [];

      allWorks.forEach(work => {
        // 이미 본 작품은 제외
        if (watchedWorkIds.includes(work.id)) return;

        let score = 0;
        let matchedGenres = [];

        // 장르 매칭 점수 (장르당 해당 장르 가중치 * 3)
        work.genres.forEach(genre => {
          if (genreWeights[genre]) {
            score += genreWeights[genre] * 3;
            matchedGenres.push(genre);
          }
        });

        // 국가 매칭 점수 (국가 가중치 * 2)
        if (countryWeights[work.country]) {
          score += countryWeights[work.country] * 2;
        }

        // 타입 매칭 점수 (타입 가중치 * 1.5, 배열 type 지원)
        const wTypes = Array.isArray(work.type) ? work.type : [work.type];
        wTypes.forEach(t => {
          if (typeWeights[t]) score += typeWeights[t] * 1.5;
        });

        // 작품 자체의 평균 평점 반영 (기본 점수 보완)
        const workReviews = db.getReviewsByWork(work.id);
        const avgRating = workReviews.length > 0
          ? workReviews.reduce((sum, r) => sum + r.rating, 0) / workReviews.length
          : 3.0; // 리뷰가 없는 경우 기본 3.0
        score += avgRating * 1.0;

        // 점수가 양수인 경우에만 추천 대상에 포함
        if (score > 0) {
          // 추천 사유 생성
          const reason = this.generateReason({
            work,
            favoriteGenres,
            favoriteCountries,
            favoriteTypes,
            matchedGenres,
            highRatedReviews,
            db
          });

          recommendations.push({
            work,
            score: parseFloat(score.toFixed(1)),
            reason
          });
        }
      });

      // 점수 내림차순 정렬 후 상위 4개 작품 반환
      return recommendations.sort((a, b) => b.score - a.score).slice(0, 4);
    },

    // 폴백 추천 (평점이 높은 작품 중 보지 않은 것 추천)
    getFallbackRecommendations: function(allWorks, watchedWorkIds) {
      const db = window.MediaDB;
      const recommendations = [];

      allWorks.forEach(work => {
        if (watchedWorkIds.includes(work.id)) return;

        const workReviews = db.getReviewsByWork(work.id);
        const avgRating = workReviews.length > 0
          ? workReviews.reduce((sum, r) => sum + r.rating, 0) / workReviews.length
          : 0;

        recommendations.push({
          work,
          score: avgRating,
          reason: "많은 사용자들이 고평가한 대중적인 인기 작품입니다. 취향 기록이 늘어나면 맞춤 추천이 작동합니다!"
        });
      });

      // 평점 높은 순으로 정렬 후 상위 4개 반환
      return recommendations
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map(rec => ({
          ...rec,
          score: rec.score > 0 ? parseFloat(rec.score.toFixed(1)) : 3.0
        }));
    },

    // 정교한 개별 추천 사유 빌더
    generateReason: function({ work, favoriteGenres, favoriteCountries, favoriteTypes, matchedGenres, highRatedReviews, db }) {
      const typeMap = { "Anime": "애니메이션", "Drama": "드라마", "Manga": "만화/웹툰", "Movie": "영화" };
      const workTypeArr = Array.isArray(work.type) ? work.type : [work.type];
      const workTypeLabel = workTypeArr.map(t => typeMap[t] || t).join("·");
      const mainMatchedGenre = matchedGenres.length > 0 ? matchedGenres[0] : null;
      
      // 해당 유저가 가장 높게 평가한 관련 작품 찾기 (장르나 타입이 겹치는 것 중 5점 준 것 우선)
      let relatedWorkTitle = "";
      for (const review of highRatedReviews) {
        const ratedWork = db.getWorkById(review.workId);
        const ratedTypes = ratedWork ? (Array.isArray(ratedWork.type) ? ratedWork.type : [ratedWork.type]) : [];
        if (ratedWork && (ratedTypes.some(t => workTypeArr.includes(t)) || ratedWork.genres.some(g => work.genres.includes(g)))) {
          relatedWorkTitle = ratedWork.title;
          if (review.rating === 5) break;
        }
      }

      let reasonSentence = "";

      if (relatedWorkTitle) {
        if (mainMatchedGenre) {
          reasonSentence += `회원님이 재미있게 보신 **'${relatedWorkTitle}'**과 동일한 **[${mainMatchedGenre}]** 장르의 작품입니다. `;
        } else {
          reasonSentence += `회원님이 고평가하신 **'${relatedWorkTitle}'**과 같은 **[${workTypeLabel}]** 카테고리 내의 인기작입니다. `;
        }
      } else {
        if (mainMatchedGenre) {
          reasonSentence += `회원님의 최애 장르인 **[${mainMatchedGenre}]** 카테고리에서 엄선된 작품입니다. `;
        } else {
          reasonSentence += `회원님의 감상 패턴에 부합하는 **[${workTypeLabel}]** 추천작입니다. `;
        }
      }

      // 부가 매칭 요소 (국가 매칭)
      if (favoriteCountries.length > 0 && work.country === favoriteCountries[0]) {
        reasonSentence += `특히 선호하시는 제작 국가인 **[${work.country}]** 콘텐츠로, 몰입도 높은 스토리를 자랑합니다.`;
      } else {
        reasonSentence += `높은 완성도로 대중과 평단의 인정을 받은 웰메이드 콘텐츠입니다.`;
      }

      return reasonSentence;
    }
  };

  window.AIRecommendation = AIRecommendation;
})();

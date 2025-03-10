const BASE_URL = 'http://localhost:8080/api/developers';

async function fetchDevelopers(searchName, startDate, endDate, page, pageSize) {
  try {
    console.log('searchName : ', searchName);
    console.log('startDate : ', startDate);
    console.log('endDate : ', endDate);
    console.log('page : ', page);
    console.log('pageSize : ', pageSize);

    const response = await fetch(`${BASE_URL}?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.contributionDevelopers)) {
      throw new Error('유효한 목록이 아닙니다.');
    }

    const totalCount = data.totalCount; // 전체 개발자 목록 수
    const totalPageCount = data.totalPageCount; // 전체 페이지 수
    const contributionDeveloperCount = data.contributionDeveloperCount; // 조회된 개발자 목록 수목록 수
    const contributionDevelopers = data.contributionDevelopers; // 조회된 개발자 목록

    console.log('totalCount: ', totalCount);
    console.log('totalPageCount: ', totalPageCount);
    console.log('contributionDeveloperCount: ', contributionDeveloperCount);
    console.log('contributionDevelopers: ', contributionDevelopers);

    return {
      totalCount: totalCount, // 전체 개발자 목록 수
      totalPageCount: totalPageCount, // 전체 페이지 수
      developerCount: contributionDeveloperCount, // 조회된 개발자 목록 수
      developers: contributionDevelopers // 조회된 개발자 목록
    };
  } catch (error) {
    console.error('데이터 목록 로딩 실패:', error);
    return { totalCount: 0, totalPageCount: 0, developerCount: 0, developers: [] };
  }
}

// JavaScript에서 모듈 내보내기
export { fetchDevelopers };

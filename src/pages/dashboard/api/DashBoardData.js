const BASE_URL = 'http://localhost:8080/api';

// Login Count 차트 데이터 조회
async function fetchLoginChartData() {
  try {
    // console.log('searchName : ', searchName);

    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const dailyLoginCount = data.dailyLoginCount;
    const dailyLoginCounts = data.dailyLoginCounts;

    if (!Array.isArray(dailyLoginCounts)) {
      throw new Error('유효한 Login 집계 목록이 아닙니다.');
    }

    console.log('dailyLoginCount: ', dailyLoginCount);
    console.log('dailyLoginCounts: ', dailyLoginCounts);

    return {
      dailyLoginCount: dailyLoginCount,
      dailyLoginCounts: dailyLoginCounts
    };
  } catch (error) {
    console.error('데이터 목록 로딩 실패:', error);
    return { dailyLoginCount: 0, dailyLoginCounts: [] };
  }
}

// Merge Count 차트 데이터 조회
async function fetchMergeChartData() {
  try {
    // console.log('searchName : ', searchName);

    const response = await fetch(`${BASE_URL}/merge-chart-data`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const dailyMergeCount = data.dailyMergeCount;
    const dailyMergeCounts = data.dailyMergeCounts;

    if (!Array.isArray(dailyMergeCounts)) {
      throw new Error('유효한 Merge 집계 목록이 아닙니다.');
    }

    console.log('dailyMergeCount: ', dailyMergeCount);
    console.log('dailyMergeCounts: ', dailyMergeCounts);

    return {
      dailyMergeCount: dailyMergeCount,
      dailyMergeCounts: dailyMergeCounts
    };
  } catch (error) {
    console.error('데이터 목록 로딩 실패:', error);
    return { dailyMergeCount: 0, dailyMergeCounts: [] };
  }
}

// JavaScript에서 모듈 내보내기
export { fetchLoginChartData, fetchMergeChartData };

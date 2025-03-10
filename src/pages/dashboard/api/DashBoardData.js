const BASE_URL = 'http://localhost:8080/api/chart-data';

async function fetchMergeChartData() {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data.dailyMergeCounts)) {
      throw new Error('유효한 Merge 집계 목록이 아닙니다.');
    }
    return data;
  } catch (error) {
    console.error('데이터 로딩 실패:', error);
    throw error;
  }
}

// JavaScript에서 모듈 내보내기
export { fetchMergeChartData };

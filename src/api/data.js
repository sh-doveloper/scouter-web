const BASE_URL = 'http://localhost:3010/api'; // API 기본 URL

async function fetchData(page, pageSize) {
  try {
    const response = await fetch(`${BASE_URL}/orders?page=${page}&pageSize=${pageSize}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('데이터 로딩 실패:', error);
    throw error;
  }
}

async function fetchBarChartData() {
  try {
    const response = await fetch(`${BASE_URL}/bar-chart-data`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('데이터 로딩 실패:', error);
    throw error;
  }
}

/**
 * 전체 사용자 목록 조회
 */
async function fetchUsers(page, pageSize) {
  try {
    const response = await fetch(`${BASE_URL}/users?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data.rows)) {
      throw new Error('유효한 사용자 목록이 아닙니다.');
    }
    return {
      users: data.rows, // 사용자 목록 배열
      totalCount: data.totalCount // 전체 사용자 수
    };
  } catch (error) {
    console.error('사용자 목록 로딩 실패:', error);
    return { users: [], totalCount: 0 };
  }
}

/**
 * 특정 사용자 정보 조회
 * @param {number} userId 사용자 ID
 */
async function fetchUserById(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error(`사용자 ID ${userId} 정보 로딩 실패:`, error);
    throw error;
  }
}

// JavaScript에서 모듈 내보내기
export { fetchBarChartData, fetchData, fetchUserById, fetchUsers };

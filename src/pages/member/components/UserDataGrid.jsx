import Chip from '@mui/material/Chip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

// import { columns, rows } from '../internals/data/gridData';
import { fetchUsersAtMockData } from '../api/userApi.js';

function renderStatus(status) {
  const colors = {
    active: 'success',
    Offline: 'default'
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}
// 컬럼 정의
const columns = [
  { field: 'id', headerName: '사용자아이디', flex: 1, minWidth: 70 },
  { field: 'username', headerName: '사원번호', flex: 1, minWidth: 100 },
  { field: 'name', headerName: '이름', flex: 1, minWidth: 100 },
  { field: 'email', headerName: '이메일', flex: 1, minWidth: 200 },
  { field: 'userTypeCode', headerName: '사용자타입', flex: 1, minWidth: 120 },
  { field: 'state', headerName: '상태', flex: 1, minWidth: 100, renderCell: (params) => renderStatus(params.value) },
  { field: 'isAdmin', headerName: '관리자여부', flex: 1, minWidth: 50 },
  { field: 'signInCount', headerName: '로그인횟수', flex: 1, minWidth: 70, align: 'right' },
  { field: 'createdAt', headerName: '가입일시', flex: 1, minWidth: 150 },
  { field: 'projectTotalCount', headerName: '프로젝트참여건수', flex: 1, minWidth: 100 },
  { field: 'guestCount', headerName: 'GuestCount', flex: 1, minWidth: 100 },
  { field: 'reporterCount', headerName: 'ReporterCount', flex: 1, minWidth: 100 },
  { field: 'developerCount', headerName: 'DeveloperCount', flex: 1, minWidth: 100 },
  { field: 'maintainerCount', headerName: 'MaintainerCount', flex: 1, minWidth: 100 },
  { field: 'ownerCount', headerName: 'OwnerCount', flex: 1, minWidth: 100 }
];

export default function UserDataGrid() {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  // 서버에서 데이터를 가져오는 함수
  const loadUsers = async (pageNumber, pageSize) => {
    setLoading(true);
    try {
      const { totalCount, totalPageCount, userCount, users } = await fetchUsersAtMockData(pageNumber, pageSize); // userList와 userListCnt 가져오기
      setRows(users.map((user) => ({ ...user, id: user.id }))); // ID 필드 추가
      setTotalRows(totalCount); // 전체 사용자 수 설정
    } catch (error) {
      console.error('사용자 데이터를 불러오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <DataGrid
      checkboxSelection
      rows={rows}
      columns={columns}
      getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
      initialState={{
        pagination: { paginationModel: { pageSize: 20 } }
      }}
      pageSizeOptions={[5, 10, 20, 50, 100]}
      paginationModel={paginationModel} // 현재 페이지 모델
      onPaginationModelChange={setPaginationModel} // 페이지 변경 이벤트 처리
      loading={loading} // 로딩 상태
      rowCount={totalRows} // 전체 사용자 수 설정
      disableColumnResize
      keepNonExistentRowsSelected
      density="compact"
      paginationMode="server" // 서버 측 페이지네이션 모드
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        filterPanel: {
          filterFormProps: {
            logicOperatorInputProps: {
              variant: 'outlined',
              size: 'small'
            },
            columnInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' }
            },
            operatorInputProps: {
              variant: 'outlined',
              size: 'small',
              sx: { mt: 'auto' }
            },
            valueInputProps: {
              InputComponentProps: {
                variant: 'outlined',
                size: 'small'
              }
            }
          }
        },
        loadingOverlay: {
          variant: 'linear-progress',
          noRowsVariant: 'linear-progress'
        }
      }}
    />
  );
}

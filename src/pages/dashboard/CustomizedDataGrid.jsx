import Chip from '@mui/material/Chip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

// import { columns, rows } from '../internals/data/gridData';
import { fetchUsers } from '../../api/data.js';

function renderStatus(status) {
  const colors = {
    active: 'success',
    Offline: 'default'
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}
// 컬럼 정의
const columns = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 50 },
  { field: 'username', headerName: 'Username', flex: 1, minWidth: 120 },
  { field: 'name', headerName: 'Name', flex: 1.5, minWidth: 150 },
  { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 200 },
  { field: 'userTypeCode', headerName: 'User Type', flex: 1, minWidth: 120 },
  { field: 'state', headerName: 'State', flex: 1, minWidth: 100, renderCell: (params) => renderStatus(params.value) },
  { field: 'signInCount', headerName: 'Sign-In Count', flex: 1, minWidth: 100, align: 'right' },
  { field: 'createdAt', headerName: 'Created At', flex: 1, minWidth: 150 }
];

export default function CustomizedDataGrid() {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  // 서버에서 데이터를 가져오는 함수
  const loadUsers = async (page, pageSize) => {
    setLoading(true);
    try {
      const { users, totalCount } = await fetchUsers(page, pageSize); // userList와 userListCnt 가져오기
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
      pageSizeOptions={[10, 20, 50]}
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

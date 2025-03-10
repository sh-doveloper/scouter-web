import Chip from '@mui/material/Chip';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { fetchDevelopers } from '../api/DevelopersApi';

// import { columns, rows } from '../internals/data/gridData';

function renderStatus(status) {
  const colors = {
    active: 'success',
    Offline: 'default'
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}
// 컬럼 정의
const columns = [
  { field: 'userId', headerName: 'User ID', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
  { field: 'userName', headerName: 'User Name', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
  { field: 'mergeCount', headerName: 'Merge Count', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
  { field: 'pushCount', headerName: 'Push Count', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
  { field: 'reviewCount', headerName: 'Review Count', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
  { field: 'totalAddLinesCount', headerName: 'Add Lines Count', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' },
  { field: 'totalRemoveLinesCount', headerName: 'Remove Lines Count', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center' }
];

export default function DevelopersDataGrid({ loadDevelopersRef }) {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);

  // 서버에서 데이터를 가져오는 함수
  const loadDevelopers = async ({
    searchName = '',
    startDate = '',
    endDate = '',
    page = paginationModel.page,
    pageSize = paginationModel.pageSize
  } = {}) => {
    setLoading(true);
    try {
      const { totalCount, developers } = await fetchDevelopers(searchName, startDate, endDate, page, pageSize);
      setRows(developers.map((developers) => ({ ...developers, id: developers.userId }))); // ID 필드 추가
      setTotalRows(totalCount); // 전체 사용자 수 설정
    } catch (error) {
      console.error('데이터를 불러오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevelopers({ page: paginationModel.page, pageSize: paginationModel.pageSize });
  }, [paginationModel.page, paginationModel.pageSize]);

  // 상위 컴포넌트에서 `loadDevelopers` 함수를 호출할 수 있도록 참조 전달
  if (loadDevelopersRef) {
    loadDevelopersRef.current = loadDevelopers;
  }

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

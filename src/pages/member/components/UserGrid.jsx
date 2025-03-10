import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Chip, Button, useTheme, Typography } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import UserDetail from './UserDetail';
import { fetchUsersAtMockData } from '../api/userApi.js';

// 상태 칩 렌더링 함수
const renderStatus = (params) => {
  const statusColors = {
    active: 'success',
    Offline: 'default'
  };
  return <Chip label={params.value} color={statusColors[params.value] || 'default'} size="small" />;
};

// 관리자 여부 칩 렌더링 함수
const renderAdminStatus = (params) => (
  <Chip
    label={params.value ? 'yes' : 'no'}
    //color={params.value ? "info" : "default"}
    size="small"
    sx={{ fontWeight: 'bold' }}
  />
);

// 상세조회 버튼 렌더링 함수
const renderDetail = (params, handleOpenDialog) => (
  <Button variant="contained" color="inherit" size="small" endIcon={<OpenInNew />} onClick={() => handleOpenDialog(params.row)}>
    조회
  </Button>
);

export default function UserGrid() {
  const theme = useTheme();
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // 사용자 데이터 로드
  const loadUsers = async (pageNumber, pageSize) => {
    setLoading(true);
    try {
      const { totalCount, users } = await fetchUsersAtMockData(pageNumber, pageSize);
      setRows(users.map((user) => ({ ...user, id: user.id })));
      setTotalRows(totalCount);
    } catch (error) {
      console.error('사용자 데이터를 불러오는 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  // 상세 조회 팝업 핸들러
  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  // 컬럼 정의
  const columns = [
    { field: 'username', headerName: '사원번호', flex: 1, minWidth: 100 },
    { field: 'name', headerName: '이름', flex: 1, minWidth: 100 },
    { field: 'state', headerName: '상태', flex: 1, minWidth: 100, renderCell: renderStatus },
    { field: 'email', headerName: '이메일', flex: 1, minWidth: 200 },
    { field: 'userTypeCode', headerName: '사용자 타입', flex: 1, minWidth: 120 },
    { field: 'isAdmin', headerName: '관리자 여부', flex: 1, minWidth: 50, align: 'right', renderCell: renderAdminStatus },
    { field: 'signInCount', headerName: '로그인 횟수', flex: 1, minWidth: 70, align: 'right' },
    { field: 'createdAt', headerName: '가입일시', flex: 1, minWidth: 150 },
    { field: 'projectTotalCount', headerName: '프로젝트 건수', flex: 1, minWidth: 80, align: 'right' },
    { field: 'guestCount', headerName: 'Guest', flex: 1, minWidth: 50, align: 'right' },
    { field: 'reporterCount', headerName: 'Reporter', flex: 1, minWidth: 50, align: 'right' },
    { field: 'developerCount', headerName: 'Developer', flex: 1, minWidth: 50, align: 'right' },
    { field: 'maintainerCount', headerName: 'Maintainer', flex: 1, minWidth: 50, align: 'right' },
    { field: 'ownerCount', headerName: 'Owner', flex: 1, minWidth: 50, align: 'right' },
    { field: 'detail', headerName: '상세조회', flex: 1, minWidth: 100, renderCell: (params) => renderDetail(params, handleOpenDialog) }
  ];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        columnHeaderHeight={80}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={loading}
        rowCount={totalRows}
        //disableColumnResize
        keepNonExistentRowsSelected
        density="compact"
        paginationMode="server"
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: { variant: 'outlined', size: 'small' },
              columnInputProps: { variant: 'outlined', size: 'small', sx: { mt: 'auto' } },
              operatorInputProps: { variant: 'outlined', size: 'small', sx: { mt: 'auto' } },
              valueInputProps: { InputComponentProps: { variant: 'outlined', size: 'small' } }
            }
          },
          loadingOverlay: { variant: 'linear-progress', noRowsVariant: 'linear-progress' }
        }}
      />

      {/* 상세 조회 다이얼로그 */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xl"
        fullWidth
        disableEnforceFocus
        disableAutoFocus
        disableEscapeKeyDown
      >
        <DialogTitle>
          <Typography
            variant="h4" // 크기 키우기
            sx={{
              fontWeight: 'bold', // 굵기 강조
              textAlign: 'left', // 좌측 정렬
              letterSpacing: '0.5px', // 글자 간격 살짝 넓히기
              textTransform: 'capitalize', // 대문자로 변환
              color: 'primary.main', // 테마 색상 사용
              borderBottom: '2px solid', // 하단 경계선 추가
              borderColor: 'primary.light', // 경계선 색상 조정
              pb: 1 // 패딩 추가 (경계선과 간격)
            }}
          >
            사용자 상세 정보
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <UserDetail user={selectedUser} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="medium" onClick={handleCloseDialog} color="secondary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

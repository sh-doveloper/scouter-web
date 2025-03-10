import React, { useState } from 'react';
import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SendIcon from '@mui/icons-material/Send';
import UserGrid from './components/UserGrid';
import UserDetail from './components/UserDetail';
import MainCard from '../../components/MainCard';

export default function BasicGrid() {
  // 상태 관리
  const [userTypeCode, setUserType] = useState('');
  const [open, setOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);

  // 핸들러 함수
  const handleChange = (event) => setUserType(event.target.value);
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') return; // 다이얼로그 외부 클릭 방지
    setOpen(false);
  };
  const handleBackdropOpen = () => setBackdropOpen(true);
  const handleBackdropClose = () => setBackdropOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* 검색 필터 */}
        <Grid item md={12}>
          <MainCard border={false} shadow={3} boxShadow>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="user-type-select-label">사용자유형코드</InputLabel>
                  <Select labelId="user-type-select-label" id="user-type-select" value={userTypeCode} onChange={handleChange} variant='outlined'>
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={0}>일반사용자</MenuItem>
                    <MenuItem value={1}>관리자사용자</MenuItem>
                    <MenuItem value={2}>외부사용자</MenuItem>
                    <MenuItem value={3}>서비스사용자</MenuItem>
                    <MenuItem value={4}>삭제된사용자</MenuItem>
                    <MenuItem value={5}>지원봇</MenuItem>
                    <MenuItem value={6}>보안봇</MenuItem>
                    <MenuItem value={7}>마이그레이션봇</MenuItem>
                    <MenuItem value={8}>경고봇</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField id="outlined-basic" label="이름" variant="outlined" sx={{ minWidth: 200 }} />
              </Grid>
              {/* 버튼 영역 */}
              <Grid item>
                <Button
                  sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  variant="contained"
                  size="medium"
                  endIcon={<ChevronRightRoundedIcon />}
                  onClick={handleBackdropOpen}
                >
                  조회
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" size="medium" endIcon={<SendIcon />} onClick={handleOpen}>
                  팝업 테스트
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>

        {/* 데이터 그리드 */}
        <Grid item md={12}>
          <MainCard sx={{ mt: 2 }} content={false} border={false} shadow={3} boxShadow>
            <UserGrid />
          </MainCard>
        </Grid>
      </Grid>

      {/* Backdrop (로딩) */}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdropOpen} onClick={handleBackdropClose}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Dialog (팝업) */}
      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogTitle>테스트 팝업 제목</DialogTitle>
        <DialogContent dividers>
          <UserDetail />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="medium" onClick={handleClose} color="secondary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MainCard from '../../components/MainCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SendIcon from '@mui/icons-material/Send';
import UserDataGrid from './components/UserDataGrid';
import UserDetail from './components/UserDetail';
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';

export default function BasicGrid() {
  const [userTypeCode, setUserType] = React.useState('');

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  // 팝업오픈
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  //const handleClose = () => setOpen(false);
  const handleClose = (event, reason) => {
    //console.log(event.key.toString());
    if (reason === 'backdropClick') {
      // 다이얼로그 외부 클릭 시 닫힘 방지
      return;
    }
    setOpen(false);
  };

  // Backdrop
  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const handleBackdropOpen = () => {
    setBackdropOpen(true);
  };
  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <MainCard border={false} shadow={3} boxShadow>
            <Grid container spacing={3}>
              <Grid item>
                <FormControl sx={{ m: 0, minWidth: 200 }}>
                  <InputLabel id="user-type-select-label">사용자유형코드</InputLabel>
                  <Select
                    labelId="user-type-select-label"
                    id="user-type-select"
                    value={userTypeCode}
                    label="UserType"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
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
                  {/*<FormHelperText>Gitlab User Type</FormHelperText>*/}
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 0, minWidth: 200 }}>
                  <TextField id="outlined-basic" label="이름" variant="outlined" />
                </FormControl>
              </Grid>
              {/* 조회 버튼 시작 */}
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
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={backdropOpen}
                  onClick={handleBackdropClose}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Grid>
              {/* 팝업 버튼 시작 */}
              <Grid item>
                <Button variant="contained" size="medium" endIcon={<SendIcon />} onClick={handleOpen}>
                  팝업 테스트
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        {/* 그리드 시작 */}
        <Grid item md={12}>
          <MainCard sx={{ mt: 2 }} content={false} border={false} shadow={3} boxShadow>
            <UserDataGrid />
          </MainCard>
        </Grid>
      </Grid>

      {/* Dialog (팝업) */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl" // 크기 조정 가능 (xs, sm, md, lg, xl)
        fullWidth // 너비를 꽉 채움
        //PaperProps={{ sx: { width: 600, height: 400 } }} // 특정 크기 지정
      >
        {/* 팝업 제목 & 닫기 버튼 */}
        <DialogTitle>
          사용자 상세 팝업입니다.
          {/*<IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}> X </IconButton>*/}
        </DialogTitle>

        {/* 팝업 본문 (다른 페이지 불러오기) */}
        <DialogContent dividers>
          <UserDetail />
        </DialogContent>
        {/* 하단 버튼 */}
        <DialogActions>
          <Button variant="contained" size="medium" onClick={handleClose} color="secondary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

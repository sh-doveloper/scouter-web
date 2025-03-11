// material-ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

// project import
import MainCard from 'components/MainCard';
import dayjs from 'dayjs';
import DevelopersDataGrid from './components/DevelopersDataGrid';

// ==============================|| SAMPLE PAGE ||============================== //

export default function Developers() {
  // 오늘 날짜 및 기본값 설정
  const today = dayjs().locale('ko').startOf('day');
  const oneMonthAgo = today.subtract(1, 'month');
  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(today);
  const [searchName, setSearchName] = useState('');

  // DevelopersDataGrid 내부의 데이터 로드 함수 참조
  const loadDevelopersRef = useRef(null);

  // 최초 실행 시 자동 호출
  useEffect(() => {
    handleSearch();
  }, []);

  // 조회 버튼 클릭 시 실행될 함수
  const handleSearch = () => {
    console.log('📢 검색 조건 확인:', {
      searchName,
      startDate: startDate ? startDate.format('YYYY-MM-DD') : '',
      endDate: endDate ? endDate.format('YYYY-MM-DD') : ''
    });
    if (loadDevelopersRef.current) {
      loadDevelopersRef.current({
        searchName: searchName,
        startDate: startDate ? startDate.format('YYYY-MM-DD') : '',
        endDate: endDate ? endDate.format('YYYY-MM-DD') : '',
        page: 0, // 검색 시 첫 페이지부터 시작
        pageSize: 10 // 기본 페이지 사이즈
      });
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={12}>
          {/* 검색 조건 영역 */}
          <MainCard sx={{ mt: 2 }} border={false} shadow={3} boxShadow>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              {/*<Grid container spacing={2} alignItems="center">*/}
              {/* 이름 검색 박스 */}
              {/*<Grid item xs="auto">*/}
              <FormControl sx={{ minWidth: 200 }}>
                <TextField
                  id="outlined-basic"
                  label="이름"
                  variant="outlined"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </FormControl>
              {/*</Grid>*/}

              {/* 날짜 선택 박스 */}
              {/*<Grid item xs="auto">*/}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/*<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>*/}
                {/* 시작일 */}
                <DatePicker
                  label="시작일"
                  format="YYYY-MM-DD" // 날짜 형식 지정
                  value={startDate}
                  onChange={(newValue) => setStartDate(dayjs(newValue))}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      sx: { minWidth: 140, textAlign: 'center' }
                    }
                  }}
                />

                {/* '~' 기호 */}
                {/*<Typography variant="body1">~</Typography>*/}

                {/* 종료일 */}
                <DatePicker
                  label="종료일"
                  format="YYYY-MM-DD" // 날짜 형식 지정
                  value={endDate}
                  onChange={(newValue) => setEndDate(dayjs(newValue))}
                  slotProps={{
                    textField: {
                      variant: 'outlined',
                      sx: { minWidth: 140, textAlign: 'center' }
                    }
                  }}
                />

                {/* 조회 버튼 */}
                {/*<Grid item xs="auto">*/}
                <Button
                  variant="contained"
                  size="medium"
                  endIcon={<ChevronRightRoundedIcon />}
                  sx={{ width: { sm: 'fit-content' } }}
                  onClick={handleSearch}
                >
                  {'조회'}
                </Button>
                {/*</Grid>*/}
              </LocalizationProvider>
              {/*</Grid>*/}
              {/*</Grid>*/}
            </Box>
          </MainCard>

          {/* 검색 결과 영역 */}
          <MainCard sx={{ mt: 2 }} content={false} border={false} shadow={3} boxShadow>
            {/*<OrdersTable />*/}
            <DevelopersDataGrid loadDevelopersRef={loadDevelopersRef} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}

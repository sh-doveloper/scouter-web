// material-ui
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import Grid from '@mui/material/Grid';
import CustomizedDataGrid from '../../dashboard/CustomizedDataGrid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CustomizedBreadcrumbs from '../../../common/components/StyledBreadcrumb';
import dayjs from 'dayjs';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  // 오늘 날짜 및 기본값 설정
  const today = dayjs().locale('ko').startOf('day'); // ✅ 시간을 00:00:00으로 맞춤
  const oneMonthAgo = today.subtract(1, 'month');

  const [startDate, setStartDate] = useState(oneMonthAgo);
  const [endDate, setEndDate] = useState(today);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <CustomizedBreadcrumbs />
      </Box>
      <Typography variant="h5">개발자</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={12}>
          {/* 검색 조건 영역 */}
          <MainCard sx={{ mt: 2 }} border={false} shadow={3} boxShadow>
            <Grid container spacing={2}>
              {/* 이름 검색 박스 */}
              <Grid item>
                <FormControl sx={{ m: 0, minWidth: 200 }}>
                  <TextField id="outlined-basic" label="이름" variant="outlined" />
                </FormControl>
              </Grid>
              {/* 날짜 선택 박스 */}
              <Grid item>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* 시작일 */}
                    <DatePicker
                      label="시작일"
                      format="YYYY-MM-DD" // 날짜 형식 지정
                      value={startDate}
                      onChange={(newValue) => setStartDate(dayjs(newValue))}
                      renderInput={(params) => <TextField {...params} size="small" sx={{ minWidth: 140, textAlign: 'center' }} />}
                    />

                    {/* '~' 기호 */}
                    <Typography variant="body1">~</Typography>

                    {/* 종료일 */}
                    <DatePicker
                      label="종료일"
                      format="YYYY-MM-DD" // 날짜 형식 지정
                      value={endDate}
                      onChange={(newValue) => setEndDate(dayjs(newValue))}
                      renderInput={(params) => <TextField {...params} size="small" sx={{ minWidth: 140, textAlign: 'center' }} />}
                    />

                    {/* 조회 버튼 */}
                    <Grid item>
                      <Button
                        variant="contained"
                        size="medium"
                        endIcon={<ChevronRightRoundedIcon />}
                        // endIcon={<SendIcon />}
                        // onClick={handleNext}
                        sx={{
                          width: { xs: '100%', sm: 'fit-content' }
                        }}
                      >
                        {'조회'}
                      </Button>
                    </Grid>
                  </Box>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </MainCard>

          {/* 검색 결과 영역 */}
          <MainCard sx={{ mt: 2 }} content={false} border={false} shadow={3} boxShadow>
            {/*<OrdersTable />*/}
            <CustomizedDataGrid />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}

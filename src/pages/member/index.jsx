import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from '../../components/MainCard';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ReportAreaChart from '../dashboard/ReportAreaChart';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import SendIcon from '@mui/icons-material/Send';
import UserDataGrid from './components/UserDataGrid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column'
}));

const handleNext = () => {
  //setActiveStep(activeStep + 1);
};

export default function BasicGrid() {
  const [userTypeCode, setUserType] = React.useState('');

  const handleChange = (event) => {
    setUserType(event.target.value);
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
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ChevronRightRoundedIcon />}
                  // endIcon={<SendIcon />}
                  onClick={handleNext}
                  sx={{
                    width: { xs: '100%', sm: 'fit-content' }
                  }}
                >
                  {'조회'}
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item md={12}>
          <MainCard sx={{ mt: 2 }} content={false} border={false} shadow={3} boxShadow>
            <UserDataGrid />
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}

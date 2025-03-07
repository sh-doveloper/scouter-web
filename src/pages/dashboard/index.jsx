// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import OrdersTable from './OrdersTable';
import ReportAreaChart from './ReportAreaChart';
import SaleReportCard from './SaleReportCard';
import UniqueVisitorCard from './UniqueVisitorCard';
import CustomizedBreadcrumbs from '../../common/components/StyledBreadcrumb';
// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import CustomizedDataGrid from './CustomizedDataGrid';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <CustomizedBreadcrumbs />
      </Box>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        {/*<Grid item xs={12} sx={{ mb: -2.25 }}>*/}
        {/*  <Typography variant="h5">Daily Report</Typography>*/}
        {/*</Grid>*/}
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Login 일별 집계</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
              <ListItemButton divider>
                <ListItemText primary="최근 30일 Login 사용자 추이" />
                <Typography variant="h5">+45.14%</Typography>
              </ListItemButton>
            </List>
            <ReportAreaChart />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Push 일별 집계</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
              <ListItemButton divider>
                <ListItemText primary="최근 30일 Push 건수 추이" />
                <Typography variant="h5">+45.14%</Typography>
              </ListItemButton>
            </List>
            <ReportAreaChart />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Merge 일별 집계</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
              <ListItemButton divider>
                <ListItemText primary="최근 30일 Merge 건수 추이" />
                <Typography variant="h5">+45.14%</Typography>
              </ListItemButton>
            </List>
            <ReportAreaChart />
          </MainCard>
        </Grid>
        {/*<Grid item xs={12} sm={6} md={4} lg={3}>*/}
        {/*  <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12} sm={6} md={4} lg={3}>*/}
        {/*  <AnalyticEcommerce commerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12} sm={6} md={4} lg={3}>*/}
        {/*  <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />*/}
        {/*</Grid>*/}

        <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        {/* row 2 */}
        <Grid item xs={12} md={7} lg={6}>
          <UniqueVisitorCard />
        </Grid>
        {/*<Grid item xs={12} md={7} lg={6}>*/}
        {/*  <Grid container alignItems="center" justifyContent="space-between">*/}
        {/*    <Grid item>*/}
        {/*      <Typography variant="h5">Recent Orders</Typography>*/}
        {/*    </Grid>*/}
        {/*    <Grid item />*/}
        {/*  </Grid>*/}
        {/*  <MainCard sx={{ mt: 2 }} content={false}>*/}
        {/*    <OrdersTable />*/}
        {/*    /!* <CustomizedDataGrid /> *!/*/}
        {/*  </MainCard>*/}
        {/*</Grid>*/}
        <Grid item xs={12} md={5} lg={6}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Reviewer 상위 10인</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="text.secondary">
                  이번주 리뷰 총 건수
                </Typography>
                <Typography variant="h3">5000건</Typography>
              </Stack>
            </Box>
            <MonthlyBarChart />
          </MainCard>
        </Grid>
        {/* row 3 */}
        <Grid item xs={12} md={7} lg={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Gitlab Project Details</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            {/*<OrdersTable />*/}
            <CustomizedDataGrid />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}

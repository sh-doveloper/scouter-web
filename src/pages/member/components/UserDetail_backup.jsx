import React, { useEffect, useState } from 'react';
import {
  Avatar, Chip, CircularProgress, Grid, Typography,
  Card, CardContent, Divider, Box, useTheme
} from '@mui/material';
import {
  Person, Email, CalendarToday, Lock,
  Public, Work, Key, AccountCircle
} from '@mui/icons-material';
import MainCard from '../../../components/MainCard';
import { fetchUserAtMockData } from '../api/userApi.js';

// 날짜 포맷 함수
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// 불리언 값 UI 변환 (칩)
const renderBoolean = (value) => (
  <Chip label={value ? 'yes' : 'no'} color={value ? 'primary' : 'secondary'} size="small" />
);

// 재사용 가능한 카드 컴포넌트
const UserInfoCard = ({ title, icon, children }) => {
  const theme = useTheme();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, display: 'flex', alignItems: 'center' }}>
          {icon} {title}
        </Typography>
        <Divider sx={{ my: 1, backgroundColor: theme.palette.divider }} />
        {children}
      </CardContent>
    </Card>
  );
};

export default function UserDetail({ user }) {
  const theme = useTheme();
  const textPrimary = theme.palette.text.primary;
  const textSecondary = theme.palette.text.secondary;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // 사용자 데이터 로드
  useEffect(() => {
    if (user?.id) {
      const loadUser = async (userId) => {
        setLoading(true);
        try {
          const { userDetail } = await fetchUserAtMockData(userId);
          setUserData(userDetail);
        } catch (error) {
          console.error('사용자 데이터를 불러오는 중 오류 발생:', error);
        } finally {
          setLoading(false);
        }
      };
      loadUser(user.id);
    }
  }, [user]);

  if (loading) {
    return (
      <MainCard>
        <CircularProgress />
      </MainCard>
    );
  }

  if (!userData) {
    return (
      <MainCard>
        <Typography sx={{ color: textPrimary }}>
          사용자 정보를 불러올 수 없습니다.
        </Typography>
      </MainCard>
    );
  }

  return (
    <MainCard>
      <Grid container spacing={3}>
        {/* 프로필 영역 */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: theme.palette.background.default }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar
                  src={userData.avatar}
                  sx={{ width: 80, height: 80, marginRight: 2, backgroundColor: theme.palette.background.paper }}
                >
                  <AccountCircle fontSize="large" sx={{ color: textPrimary }} />
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ color: textPrimary }}>
                    {userData.name} ({userData.username})
                  </Typography>
                  <Typography color={textSecondary}>
                    {userData.email}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 기본 정보 */}
        <Grid item xs={12} sm={6}>
          <UserInfoCard title="기본 정보" icon={<Person sx={{ verticalAlign: 'middle', marginRight: 1 }} />}>
            <Typography><span>사용자아이디 :</span> {userData.id}</Typography>
            <Typography><span>가입일 :</span> {formatDate(userData.createdAt)}</Typography>
            <Typography><span>현재 로그인 IP :</span> {userData.currentSignInIp}</Typography>
          </UserInfoCard>
        </Grid>

        {/* 활동 정보 */}
        <Grid item xs={12} sm={6}>
          <UserInfoCard title="활동 정보" icon={<Email sx={{ verticalAlign: 'middle', marginRight: 1 }} />}>
            <Typography><span>이메일 :</span> {userData.email}</Typography>
            <Typography><span>최근 활동 :</span> {formatDate(userData.lastActivityOn)}</Typography>
          </UserInfoCard>
        </Grid>

        {/* 보안 정보 */}
        <Grid item xs={12} sm={6}>
          <UserInfoCard title="보안 설정" icon={<Lock sx={{ verticalAlign: 'middle', marginRight: 1 }} />}>
            <Typography><span>관리자 여부 :</span> {renderBoolean(userData.admin)}</Typography>
            <Typography><span>이중 인증 필요 :</span> {renderBoolean(userData.otpRequiredForLogin)}</Typography>
          </UserInfoCard>
        </Grid>

        {/* 계정 설정 */}
        <Grid item xs={12} sm={6}>
          <UserInfoCard title="계정 설정" icon={<Work sx={{ verticalAlign: 'middle', marginRight: 1 }} />}>
            <Typography><span>프로젝트 제한 :</span> {userData.projectsLimit} 개</Typography>
            <Typography><span>유저 타입 :</span> {userData.userTypeCode}</Typography>
          </UserInfoCard>
        </Grid>

        {/* 보안 토큰 */}
        <Grid item xs={12}>
          <UserInfoCard title="보안 토큰" icon={<Key sx={{ verticalAlign: 'middle', marginRight: 1 }} />}>
            <Typography color={textSecondary}>
              계정 생성 시 발급된 인증 토큰입니다.
            </Typography>
            <Typography sx={{ fontFamily: 'monospace', mt: 1, color: textPrimary }}>
              {userData.confirmationToken}
            </Typography>
          </UserInfoCard>
        </Grid>
      </Grid>
    </MainCard>
  );
}

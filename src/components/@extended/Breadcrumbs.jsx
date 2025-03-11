// base
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// material-ui
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

// project import
import MainCard from 'components/MainCard';
import menuItems from 'menu-items';

// 스타일 셋팅
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06)
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12)
    },
    cursor: 'default' // 링크 비활성화 (클릭 불가)
  };
});

// 특정 경로명을 한글로 변환하는 매핑 객체
const breadcrumbMap = {
  main: 'Main',
  dashboard: 'Dashboard',
  member: 'Member',
  users: '사용자',
  contribution: 'Contribution',
  developers: '개발자',
  projects: '프로젝트'
};

// 현재 경로(`pathname`)를 기반으로 `menuItems`에서 `title`을 찾는 함수
const findTitleByPath = (pathname, menuList) => {
  return (
    menuList
      .flatMap((menu) => menu.children || []) // `children`이 있는 경우 평탄화(flatten)
      .find((item) => item.url === pathname)?.title || '' // `find`로 URL이 일치하는 항목 찾기
  );
};

export default function Breadcrumbs({ title, ...others }) {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x); // 현재 URL을 '/'로 나누어 배열로 변환

  // 현재 URL을 기반으로 `menuItems`에서 `title` 찾기 (boolean이면 무시)
  const resolvedTitle = typeof title === 'string' ? title : findTitleByPath(location.pathname, menuItems.items);

  return (
    <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
        {/* navigation */}
        <Grid item>
          <MuiBreadcrumbs aria-label="breadcrumb">
            {pathNames.map((value, index) => {
              const label = breadcrumbMap[value] || value; // 매핑된 값이 있으면 한글 변환, 없으면 원래 값 유지
              return <StyledBreadcrumb key={index} label={label} />;
            })}
          </MuiBreadcrumbs>
        </Grid>
        {/* Title */}
        {resolvedTitle && (
          <Grid item sx={{ mt: 2, width: '100%' }}>
            {resolvedTitle && (
              <Grid item sx={{ mt: 2, width: '100%' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold', // 굵기 강조
                    textAlign: 'left', // 좌측 정렬
                    letterSpacing: '0.5px', // 글자 간격 살짝 넓히기
                    textTransform: 'capitalize', // 첫자만 대문자
                    color: 'primary.main', // 테마 색상 사용
                    borderBottom: '2px solid', // 하단 경계선 추가
                    borderColor: 'primary.light', // 경계선 색상 조정
                    pb: 1 // 패딩 추가 (경계선과 간격)
                  }}
                >
                  {resolvedTitle}
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
}

Breadcrumbs.propTypes = {
  title: PropTypes.any,
  sx: PropTypes.any,
  others: PropTypes.any
};

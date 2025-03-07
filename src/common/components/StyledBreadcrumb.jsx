import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
    }
  };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function CustomizedBreadcrumbs() {
  const location = useLocation(); // 현재 경로 가져오기
  const pathnames = location.pathname.split('/').filter((x) => x); // '/' 기준으로 경로 나누기
  // 경로명을 한글로 변환하는 매핑 객체
  const breadcrumbMap = {
    developers: '개발자',
    contribution: 'Contribution',
    dashboard: 'Dashboard',
    projects: '프로젝트',
    users: '사용자',
    home: '홈'
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* 홈 버튼 */}
      {/*<StyledBreadcrumb component={Link} to="/" label="Home" icon={<HomeIcon fontSize="small" />} sx={{ cursor: 'pointer' }} />*/}

      {/* 동적 경로 생성 (클릭 기능 제거) */}
      {pathnames.map((value, index) => {
        const label = breadcrumbMap[value] || value; // 매핑된 값이 있으면 한글 변환, 없으면 원래 값 유지
        return <StyledBreadcrumb key={index} label={label} />;
      })}
    </Breadcrumbs>
  );
}

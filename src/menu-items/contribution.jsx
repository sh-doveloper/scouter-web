// assets
import { CodeOutlined, ProjectOutlined } from '@ant-design/icons';

// icons
const icons = {
  CodeOutlined, // 개발자 아이콘 (예: Code 아이콘)
  ProjectOutlined // 프로젝트 아이콘
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const contribution = {
  id: 'contribution',
  title: 'Contribution',
  type: 'group',
  children: [
    {
      id: 'developers',
      title: '개발자',
      type: 'item',
      url: '/contribution/developers',
      icon: icons.CodeOutlined,
      breadcrumbs: true
    },
    {
      id: 'projects',
      title: '프로젝트',
      type: 'item',
      url: '/contribution/projects',
      icon: icons.ProjectOutlined,
      breadcrumbs: true
    }
  ]
};

export default contribution;

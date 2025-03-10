// assets
import { TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
  TeamOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const member = {
  id: 'member',
  title: 'Member',
  type: 'group',
  children: [
    {
      id: 'users',
      title: '사용자',
      type: 'item',
      url: '/member/users',
      icon: icons.TeamOutlined,
      breadcrumbs: true
    }
  ]
};

export default member;

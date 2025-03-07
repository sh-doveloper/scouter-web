// assets
import { DashboardOutlined, AreaChartOutlined, LineChartOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  AreaChartOutlined,
  LineChartOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: '홈',
      type: 'item',
      url: '/dashboard/home',
      icon: icons.LineChartOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

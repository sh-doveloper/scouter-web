// assets
import { DashboardOutlined, AreaChartOutlined, LineChartOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  AreaChartOutlined,
  LineChartOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const main = {
  id: 'group-main',
  title: 'Main',
  type: 'group',
  children: [
    {
      id: 'main',
      title: 'Dashboard',
      type: 'item',
      url: '/main/dashboard',
      icon: icons.LineChartOutlined,
      breadcrumbs: true
    }
  ]
};

export default main;

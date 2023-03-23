import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const PageLayout = () => {

  return (
    <div id="layout">
      <Sidebar />
      <div id="main">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
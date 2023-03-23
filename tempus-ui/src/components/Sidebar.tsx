import { MdHomeFilled } from 'react-icons/md';
import { BsPeopleFill } from 'react-icons/bs';
import { TbReportMoney } from 'react-icons/tb';

import SidebarItem from 'src/components/SidebarItem';

const Sidebar = () => {
  return (
    <div id="sidebar">
      <div id="sidebar-header">
        {/* <img src="./tempus-light.svg" height="32px" width="32px" /> */}
        <p>Tempus</p>
      </div>
      <div id="sidebar-items">
        <SidebarItem text="Home" route="/" Icon={MdHomeFilled} />
        <SidebarItem text="Clients" route="/clients" Icon={BsPeopleFill} />
        <SidebarItem text="Invoice" route="/invoice" Icon={TbReportMoney} />
      </div>
    </div>
  );
};

export default Sidebar;
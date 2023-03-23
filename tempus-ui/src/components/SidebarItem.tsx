import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';

type SidebarItemProps = {
  route: string,
  text: string,
  Icon: IconType
}

const SidebarItem = (props: SidebarItemProps) => {
  const { route, text, Icon } = props;

  return (
    <NavLink
      to={route}
      style={({ isActive }) => ({
        textDecoration: 'none',
      })}
    >
      <div className="sidebar-item">
        <Icon size="1.5rem" />
        <span>{text}</span>
      </div>
    </NavLink>
  );
};

export default SidebarItem;
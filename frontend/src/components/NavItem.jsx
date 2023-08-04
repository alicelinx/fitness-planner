import '../styles/NavItem.scss';
import { navItems } from '../mocks/mockData.js';

const NavItem = () => {
  return (
    <div className="top-nav-bar">
      {
        navItems.map(item => <p className="nav-item"> {item} </p>)
      }
    </div>

  );
};

export default NavItem;
import '../styles/NavItem.scss';
import { navItems } from '../data/mockData.js';

const NavItem = (props) => {
  return (
    <div className="nav-item">
      {
        navItems.map(item => <p>{item}</p>)
      }
    </div>

  );
};

export default NavItem;
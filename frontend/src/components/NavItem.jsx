import '../styles/NavItem.scss';

const NavItem = ({ toggleRoute, label }) => {
  return (
    <button className="nav-item" onClick={toggleRoute}>{label}</button>
  );
};

export default NavItem;
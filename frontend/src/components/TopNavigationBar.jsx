import '../styles/TopNavigationBar.scss';
import NavItem from './NavItem';

const TopNavigationBar = ({ setRoute, isLoggedIn, logout }) => {

  return (
    <div className="top-nav-bar">

      <NavItem label="FITNESS PLANNER" toggleRoute={() => setRoute('home')} />

      <NavItem label="Create Workout" />

      <NavItem label="My Workout" />

      {!isLoggedIn && <NavItem label="Login" toggleRoute={() => setRoute('login')} />}

      {isLoggedIn && <NavItem label="Logout" toggleRoute={logout} />}


      <NavItem label="Register" />
    </div>
  );
};

export default TopNavigationBar;
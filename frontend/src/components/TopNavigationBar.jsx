import '../styles/TopNavigationBar.scss';
import NavItem from './NavItem';

const TopNavigationBar = ({ setRoute, isLoggedIn, logout }) => {

  const username = localStorage.getItem('username');
  return (
    <div className="top-nav-bar">
      <img src='/logo.png' className='logo-image' onClick={() => setRoute('home')} alt="logo" />
      <div>
        <NavItem label="Create Workout" toggleRoute={() => setRoute('createWorkout')} />

        <NavItem label="My Workout" toggleRoute={() => setRoute('workouts')} />
      </div>

      <div>
        {!isLoggedIn && <NavItem label="Login" toggleRoute={() => setRoute('login')} />}

        {isLoggedIn && <span className='greeting-user'>Hello, {username.replace(/"/g, '')}&nbsp;&nbsp;&nbsp;&nbsp;</span>}
        {isLoggedIn && <NavItem label="Logout" toggleRoute={logout} />}

      </div>

    </div>
  );
};

export default TopNavigationBar;
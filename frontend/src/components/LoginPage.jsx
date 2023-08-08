import '../styles/LoginPage.scss';
import { loginUser } from '../lib/requests';


const LoginPage = ({ setRoute, setIsLoggedIn }) => {
  return (
    <>
      <br></br><h3>Login</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        loginUser(e.target.email.value, e.target.password.value)
          .then(data => {
            localStorage.setItem('email', JSON.stringify(data.email));
            localStorage.setItem('username', JSON.stringify(data.username));
            localStorage.setItem('id', JSON.stringify(data.id));
            setIsLoggedIn(true);
            setRoute('home');
          });
      }}>
        <div className="login-container">
          <label for="email">Email</label><br></br>
          <input className="email" name="email" type="email"></input><br></br><br></br>
          <label for="password">Password</label><br></br>
          <input className="password" name="password" type="password"></input><br></br><br></br>
          <button type="submit" class="btn btn-outline-light">Login</button>
        </div>
      </form>
      <br></br>
      <div className="no-account">
        <span>New to Fitness Planner?     <button>Join now</button></span>
      </div>
    </>
  );

};

export default LoginPage;
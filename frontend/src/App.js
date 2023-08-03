import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import TopNavigationBar from './components/TopNavigationBar';
import LoginPage from './components/LoginPage';
import CreateWorkout from './components/CreateWorkout';

function App() {
  const [route, setRoute] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <TopNavigationBar setRoute={setRoute} isLoggedIn={isLoggedIn} logout={logout} />
      {route === "home" && <HomePage />}
      {route === "login" && <LoginPage setRoute={setRoute} setIsLoggedIn={setIsLoggedIn} />}
      {route === "createWorkout" && <CreateWorkout setRoute={setRoute} />}
    </div>
  );
}

export default App;

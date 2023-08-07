import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import TopNavigationBar from './components/TopNavigationBar';
import LoginPage from './components/LoginPage';

function App() {
  const [route, setRoute] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
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
    </div>
  );
}

export default App;

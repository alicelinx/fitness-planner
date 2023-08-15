import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import TopNavigationBar from './components/TopNavigationBar';
import LoginPage from './components/LoginPage';
import WorkoutList from './components/WorkoutList';
import ChooseCreateWorkout from './components/ChooseCreateWorkout';
import Footer from './components/Footer';


function App() {
  const [route, setRoute] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('id');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRoute("login");
  };

  return (
    <div className="App">
      <TopNavigationBar setRoute={setRoute} isLoggedIn={isLoggedIn} logout={logout} />
      {route === "home" && <HomePage />}
      {route === "login" && <LoginPage setRoute={setRoute} setIsLoggedIn={setIsLoggedIn} />}
      {route === "createWorkout" && <ChooseCreateWorkout setRoute={setRoute} />}
      {route === "workouts" && <WorkoutList />}
      <Footer />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/Header.css';
import Homepage from '../webpages/Homepage';
import LoginPage from '../webpages/LoginPage';
import SignUpUserPage from '../webpages/SignUpUserPage';
import ProfilePage from '../webpages/ProfilePage';
import CreateActivityPage from '../webpages/CreateActivityPage';
import ActivitiesPage from '../webpages/ActivitiesPage';
import ParticipationPage from '../webpages/ParticipationPage';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

    // Check if the user is logged in
  async function checkLoggedIn() {
    const API_URL = process.env.REACT_APP_API_URL

    let restURL = API_URL + "/rest/users/isLoggedIn";
    await fetch(restURL, {
      method: "GET",
      credentials: 'include',
      headers: {
        mode: 'no-cors',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      setIsLoggedIn(data);
    })
  }
    // Get the currently logged in user's data
  async function fetchUserData() {
    const API_URL = process.env.REACT_APP_API_URL
    let restURL = API_URL + "/rest/users/current";
    await fetch(restURL, {
      method: "GET",
      credentials: 'include',
      headers: {
        mode: 'no-cors',
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      setUserData(data);
    })
  }

  useEffect(() => {
    checkLoggedIn();
    fetchUserData();
  }, [])

    // Create CreateActivityPage if the user is admin or organizer
  function renderCreate() {
    if (userData.type === "admin" || userData.type === "organizer") {
      return <CreateActivityPage />;
    }
  }

  return (
    <Router>
      <div className="Header">
        <Link to="/">Voľnočasový portál</Link>
        {isLoggedIn &&
          <div className="links">
            <Link to="/upcomingactivities">Aktivity</Link> 
            {renderCreate() && <Link to="/createactivity">Vytvorenie aktivity</Link>}
            <Link to="/participations">Účasti</Link>
            <Link to="/profile">Môj profil</Link>        
          </div>
        }
        {!isLoggedIn &&
          <div className="links">
            <Link to="/upcomingactivities">Aktivity</Link> 
            <Link to="/login">Prihlásenie</Link>
            <Link to="/signup">Registrácia</Link>
          </div>
        }
      </div>
      <div className="navContain">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/upcomingactivities" element={<ActivitiesPage />} />
          {renderCreate() && <Route path="/createactivity" element={<CreateActivityPage />} />}
          <Route path="/participations" element={<ParticipationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpUserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Header;

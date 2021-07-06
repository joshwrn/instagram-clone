import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../services/firebase';
import '../../styles/home/home__login.css';

const LoginButton = () => {
  const { login, logout, currentUser } = useAuth();

  const fireTest = async (e) => {
    e.preventDefault();
    if (currentUser) {
      console.log(currentUser.uid);
      const userTest = await firestore
        .collection('users')
        .doc(currentUser.uid)
        .get();
      console.log(userTest.data().bio);
      console.log(currentUser.metadata.creationTime);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      {!currentUser && (
        <div id="home__sidebar__login-buttons">
          <Link id="home__sidebar__sign-up" to="/sign-up">
            <button className="google-sign-in">Sign Up</button>
          </Link>
          or
          <button className="google-sign-in" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginButton;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/home/home__login.css';

const LoginButton = () => {
  const { login, currentUser } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
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

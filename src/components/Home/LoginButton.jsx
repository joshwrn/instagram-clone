import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Styles from '../../styles/home/home__login.module.css';

const LoginButton = () => {
  const { login, currentUser } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      {!currentUser && (
        <div className={Styles.loginButtons}>
          <Link id="home__sidebar__sign-up" to="/sign-up">
            <button className={Styles.google}>Sign Up</button>
          </Link>
          or
          <button className={Styles.google} onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginButton;

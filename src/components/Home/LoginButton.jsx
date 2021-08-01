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
            <button className={Styles.signUp}>Sign Up</button>
          </Link>
          <button className={Styles.login} onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginButton;

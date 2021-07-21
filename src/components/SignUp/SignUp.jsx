import React, { useEffect, useState } from 'react';
import { signIn, firestore } from '../../services/firebase';
import Styles from '../../styles/sign-up/sign-up.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/img/logo/logo-2.png';

const SignUp = () => {
  const { login, currentUser, firebaseRegister, anon } = useAuth();
  const [userInput, setUserInput] = useState('');
  const [nameTaken, setNameTaken] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const reg = /[^a-zA-Z\d]/gi;
    const newVal = value.replace(reg, '');
    setUserInput(newVal);
  };

  useEffect(() => {
    let foundName;
    const check = (async () => {
      if (userInput.length > 3) {
        const userRef = await firestore
          .collection('users')
          .where('username', '==', userInput)
          .get()
          .then((searchResults) => {
            return searchResults.forEach((doc) => {
              foundName = doc.data();
            });
          });
        if (foundName === undefined) {
          setNameTaken(false);
        } else {
          setNameTaken(true);
        }
      }
    })();
  }, [userInput]);

  useEffect(() => {
    return firebaseRegister(userInput);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn();
  };

  const doNothing = (e) => {
    e.preventDefault();
  };

  const handleAnon = (e) => {
    e.preventDefault();
    anon();
  };

  let nameHelper = <p className={Styles.nameHelper}>Name must be 4-15 characters.</p>;

  if (userInput.length !== 0) {
    if (userInput.length <= 3) {
      nameHelper = <p className={Styles.nameHelper}>Too Short.</p>;
    } else if (nameTaken === false) {
      nameHelper = (
        <p style={{ color: '#00C138' }} className={Styles.nameHelper}>
          Name is available.
        </p>
      );
    } else {
      nameHelper = (
        <p style={{ color: '#ff0000' }} className={Styles.nameHelper}>
          Name has already been taken.
        </p>
      );
    }
  }

  return (
    <>
      {!currentUser ? (
        <div className={Styles.signUp}>
          <div className={Styles.container}>
            <div className={Styles.header}>
              <img className={Styles.logoImg} src={logo} alt="" />
              <div className={Styles.textContainer}>
                <h2 className={Styles.headerText}>Sign Up</h2>
              </div>
            </div>
            <div className={Styles.formContainer}>
              <form pattern="[0-9a-zA-Z_.-]*" className={Styles.form}>
                <div className={Styles.input}>
                  <div className={Styles.username}>
                    <p>@</p>
                  </div>
                  <input
                    required
                    onChange={handleChange}
                    className={Styles.inputBox}
                    type="text"
                    placeholder="username"
                    maxLength="15"
                    minLength="4"
                    value={userInput}
                  />
                </div>
                <div className={Styles.helperDiv}>{nameHelper}</div>
                <button
                  type={'submit'}
                  onClick={!nameTaken && userInput.length > 3 ? handleSubmit : doNothing}
                  className={Styles.signUpButton}
                  style={
                    !nameTaken && userInput.length > 3
                      ? {
                          backgroundColor: 'black',
                          cursor: 'pointer',
                        }
                      : { backgroundColor: 'gray', cursor: 'not-allowed' }
                  }
                >
                  Sign Up With Google
                </button>
              </form>
              <p className={Styles.or}>Already signed up?</p>
              <button onClick={login} className={Styles.loginButton}>
                Login
              </button>
              <button onClick={handleAnon}>anon</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={Styles.signUp}>
          <div className={Styles.notFoundContainer}>
            <h3>Already Logged In</h3>
            <Link to="/">
              <button className={Styles.returnButton}>Return Home</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;

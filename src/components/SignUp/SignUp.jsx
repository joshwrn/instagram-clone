import React, { useEffect, useState } from 'react';
import { signIn, firestore } from '../../services/firebase';
import '../../styles/sign-up/sign-up.css';
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

  let nameHelper = <p className="name-helper">Name must be 4-15 characters.</p>;

  if (userInput.length !== 0) {
    if (userInput.length <= 3) {
      nameHelper = <p className="name-helper">Too Short.</p>;
    } else if (nameTaken === false) {
      nameHelper = (
        <p style={{ color: '#00C138' }} className="name-helper">
          Name is available.
        </p>
      );
    } else {
      nameHelper = (
        <p style={{ color: '#ff0000' }} className="name-helper">
          Name has already been taken.
        </p>
      );
    }
  }

  return (
    <>
      {!currentUser ? (
        <div id="sign-up">
          <div id="sign-up__container">
            <div id="sign-up__header">
              <img id="sign-up__logo__img" src={logo} alt="" />
              <div id="sign-up__header__text-container">
                <h2 id="sign-up__header__text">Sign Up</h2>
              </div>
            </div>
            <div id="sign-up__form-container">
              <form pattern="[0-9a-zA-Z_.-]*" className="sign-up__form">
                <div className="sign-up__input">
                  <div className="username">
                    <p>@</p>
                  </div>
                  <input
                    required
                    onChange={handleChange}
                    className="input-box"
                    type="text"
                    placeholder="username"
                    maxLength="15"
                    minLength="4"
                    value={userInput}
                  />
                </div>
                <div className="sign-up__helper-div">{nameHelper}</div>
                <button
                  type={'submit'}
                  onClick={!nameTaken && userInput.length > 3 ? handleSubmit : doNothing}
                  className="sign-up"
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
              <p className="or">Already signed up?</p>
              <button onClick={login} className="sign-up__form__login-button">
                Login
              </button>
              <button onClick={handleAnon}>anon</button>
            </div>
          </div>
        </div>
      ) : (
        <div id="sign-up">
          <div id="sign-up__not-found-container">
            <h3>Already Logged In</h3>
            <Link to="/">
              <button id="sign-up__return-button">Return Home</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;

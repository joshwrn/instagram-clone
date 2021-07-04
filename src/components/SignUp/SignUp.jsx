import React, { useEffect, useState } from 'react';
import { signIn, firestore } from '../../services/firebase';
import '../../styles/sign-up/sign-up.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const SignUp = () => {
  const { login, logout, currentUser, firebaseRegister } = useAuth();
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInput(value);
  };

  const testing = async (e) => {
    e.preventDefault();
    let arr = [];
    const userRef = await firestore
      .collection('users')
      .where('pizza', '==', 'ham')
      .get()
      .then((querySnapshot) => {
        return querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });

    console.log(arr[0]);
  };

  useEffect(() => {}, [userInput]);

  useEffect(() => {
    return firebaseRegister(userInput);
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <>
      {!currentUser ? (
        <div id="sign-up">
          <div onClick={testing} id="sign-up__container">
            <h2>Complete Sign Up</h2>
            <form className="sign-up__form">
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
                />
              </div>
              <button type="submit" onClick={handleSubmit} className="sign-up">
                Sign Up With Google
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div id="sign-up">
          <div id="sign-up__not-found-container">
            <h3>Already Logged In</h3>
            <Link to="/home">
              <button id="sign-up__return-button">Return Home</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;

import React, { useContext, useState, useEffect } from 'react';
import { auth, signIn, firestore, timestamp } from '../services/firebase';
import { useHistory } from 'react-router-dom';

// Create context
const AuthContext = React.createContext();

// Function allows you to use the context
export function useAuth() {
  return useContext(AuthContext);
}

// Function that uses provider in return
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userProfile, setUserProfile] = useState();
  const [attemptLogin, setAttemptLogin] = useState();
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  const login = () => {
    signIn();
    setAttemptLogin(true);
  };

  function logout() {
    setUserProfile(null);
    return auth.signOut();
  }

  function anon() {
    return auth.signInAnonymously();
  }

  // only check user on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const getUserProfile = async () => {
    const profileData = await firestore.collection('users').doc(currentUser.uid).get();
    setUserProfile(profileData.data());
  };

  useEffect(() => {
    if (currentUser) {
      getUserProfile();
    }
    if (attemptLogin && currentUser) {
      console.log(currentUser);
      return firestore
        .collection('users')
        .doc(currentUser.uid)
        .get()
        .then((userData) => {
          //# if user data does not exist
          if (!userData.exists) {
            console.log('huh');
            auth.signOut();
            setAttemptLogin(false);
            //do something redirect idk
          }
        });
    }
  }, [currentUser]);

  //+ check whether name is taken and then create the user
  const firebaseRegister = async (usernameInput) => {
    if (currentUser !== null) {
      const userData = await firestore.collection('users').doc(currentUser.uid).get();
      //# if user data does not exist
      if (!userData.exists) {
        //currentUser.metadata.creationTime === currentUser.metadata.lastSignInTime
        let foundName;
        const userRef = await firestore
          .collection('users')
          .where('username', '==', usernameInput)
          .get()
          .then((searchResults) => {
            return searchResults.forEach((doc) => {
              foundName = doc.data();
            });
          });
        console.log(usernameInput, foundName);
        if (foundName === undefined) {
          console.log('new user', foundName);
          firestore
            .collection('users')
            .doc(currentUser.uid)
            .set({
              displayName: currentUser.displayName,
              profilePhoto: currentUser.photoURL,
              banner:
                'https://images.unsplash.com/photo-1512319302256-dc970e613e2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
              bio: `Hi my name is ${currentUser.displayName}`,
              username: usernameInput,
              userID: currentUser.uid,
              joinDate: currentUser.metadata.creationTime,
              lastPostDate: 0,
              likedPosts: [],
              postsCounter: 0,
              followers: [],
              following: [],
              messagesCounter: 0,
            })
            .then(history.push('/settings'))
            .catch(function (error) {
              console.error('Error writing new message to database', error);
            });
        } else {
          auth.signOut();
        }
      } else {
        history.push('/');
      }
    }
  };

  const value = {
    currentUser,
    userProfile,
    getUserProfile,
    login,
    logout,
    firebaseRegister,
    anon,
  };

  // Takes all value props
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

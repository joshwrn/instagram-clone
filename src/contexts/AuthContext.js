import React, { useContext, useState, useEffect } from 'react';
import { auth, signIn, firestore, timestamp } from '../services/firebase';

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

  const login = () => {
    signIn();
    setAttemptLogin(true);
  };

  function logout() {
    setUserProfile(undefined);
    return auth.signOut();
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
    const profileData = await firestore
      .collection('users')
      .doc(currentUser.uid)
      .get();
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

  //check whether name is taken and then create the user
  const firebaseRegister = async (usernameInput) => {
    if (currentUser !== null) {
      const userData = await firestore
        .collection('users')
        .doc(currentUser.uid)
        .get();
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
              likesCounter: 0,
              postsCounter: 0,
              followersCounter: 0,
              followingCounter: 0,
              messagesCounter: 0,
            })
            .catch(function (error) {
              console.error('Error writing new message to database', error);
            });
        } else {
          auth.signOut();
        }
      } else {
        console.log('already have account');
      }
    }
  };

  const value = {
    currentUser,
    userProfile,
    login,
    logout,
    firebaseRegister,
  };

  // Takes all value props
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

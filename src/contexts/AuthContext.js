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
  const [loading, setLoading] = useState(true);

  const login = () => {
    signIn();
  };

  function logout() {
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

  useEffect(() => {
    if (currentUser !== undefined) {
      firestore
        .collection('users')
        .doc(currentUser.uid)
        .get()
        .then((userData) => {
          //# if user data does not exist
          if (!userData.exists) {
            console.log('add');
            firestore
              .collection('users')
              .doc(currentUser.uid)
              .set({
                displayName: currentUser.displayName,
                profilePhoto: currentUser.photoURL,
                banner:
                  'https://images.unsplash.com/photo-1512319302256-dc970e613e2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
                bio: `Hi my name is ${currentUser.displayName}`,
                username: currentUser.uid,
                joinDate: timestamp,
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
            console.log('sub-collection  existed');
          }
        });
    }
  }, [currentUser]);

  const value = {
    currentUser,
    login,
    logout,
  };

  // Takes all value props
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

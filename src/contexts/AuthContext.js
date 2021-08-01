import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, signIn, firestore, firestoreFieldValue } from '../services/firebase';

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
    history.push('/');
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
    const profileData = await firestore.collection('users').doc(currentUser.uid).get();
    setUserProfile(profileData.data());
  };

  useEffect(() => {
    if (currentUser) {
      getUserProfile();
    }
    if (attemptLogin && currentUser) {
      return firestore
        .collection('users')
        .doc(currentUser.uid)
        .get()
        .then((userData) => {
          //# if user data does not exist
          if (!userData.exists) {
            auth.signOut();
            setAttemptLogin(false);
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
        let foundName;
        await firestore
          .collection('users')
          .where('username', '==', usernameInput)
          .get()
          .then((searchResults) => {
            return searchResults.forEach((doc) => {
              foundName = doc.data();
            });
          });

        if (foundName === undefined) {
          const lower = currentUser.displayName.toLowerCase();
          const currentTime = Date.now();
          //+ create the user account
          await firestore
            .collection('users')
            .doc(currentUser.uid)
            .set({
              displayName: currentUser.displayName,
              searchName: lower,
              profilePhoto: currentUser.photoURL,
              banner:
                'https://firebasestorage.googleapis.com/v0/b/insta-a107a.appspot.com/o/default-banner.jpg?alt=media&token=d3c53902-0e3a-4761-8705-8991db9d7b68',
              bio: `Hi my name is ${currentUser.displayName}`,
              username: usernameInput,
              userID: currentUser.uid,
              joinDate: currentUser.metadata.creationTime,
              lastPostDate: 0,
              likedPosts: [],
              postsCounter: 0,
              followers: [],
              following: ['e9x1NbFsE8VqLAqAKfbpHkH0QS93'],
              messagesCounter: 0,
              notifications: [],
              theme: 'light',
            })
            .catch(function (error) {
              console.error('Error writing new message to database', error);
            });
          //+ add default message
          const addMessage = () => {
            firestore
              .collection('users')
              .doc(currentUser.uid)
              .collection('messages')
              .doc('e9x1NbFsE8VqLAqAKfbpHkH0QS93')
              .set({
                messages: [
                  {
                    message: `Hi ${currentUser.displayName}, Thanks for signing up and testing my project. Please look around and test all the features you can. You can reply to this message if you'd like, but I might not see it. So, to get in touch please email me at joshnwarren@gmail.com.`,
                    time: currentTime,
                    user: 'e9x1NbFsE8VqLAqAKfbpHkH0QS93',
                  },
                ],
                time: currentTime,
                user: 'e9x1NbFsE8VqLAqAKfbpHkH0QS93',
              });
          };
          //+ update my followers
          const addFollower = () => {
            const userRef = firestore.collection('users').doc('e9x1NbFsE8VqLAqAKfbpHkH0QS93');
            userRef.update({
              followers: firestoreFieldValue.arrayUnion(currentUser.uid),
            });
          };

          //+ notify me
          const notify = () => {
            const userRef = firestore.collection('users').doc('e9x1NbFsE8VqLAqAKfbpHkH0QS93');
            userRef.update({
              notifications: firestoreFieldValue.arrayUnion({
                user: currentUser.uid,
                type: 'followed',
                time: currentTime,
              }),
            });
          };

          await Promise.all([addMessage(), addFollower(), notify()]);
          history.push('/settings');
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
  };

  // Takes all value props
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

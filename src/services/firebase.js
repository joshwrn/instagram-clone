import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    });
  } else {
    return firebase.app(); // if already initialized, use that one
  }
};

app();

export const signIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

export const timestamp = firebase.firestore.FieldValue.serverTimestamp();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

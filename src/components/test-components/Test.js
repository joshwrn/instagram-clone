import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../services/firebase';

const Test = () => {
  const { login, logout, currentUser } = useAuth();
  const [bio, setBio] = useState('hi');

  const fireTest = async (e) => {
    e.preventDefault();
    console.log(currentUser.uid);
    const userTest = await firestore
      .collection('users')
      .doc(currentUser.uid)
      .get();
    setBio(userTest.data().bio);
    console.log(userTest.data().bio);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    login();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div>
      {currentUser && currentUser.photoURL}
      <button onClick={handleLogin}>login</button>
      <button onClick={handleLogout}>logout</button>
      <button onClick={fireTest}>fire</button>
    </div>
  );
};

export default Test;

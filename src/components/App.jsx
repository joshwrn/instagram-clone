import '../styles/app.css';
import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Profile from './Profile/Profile.jsx';
import Post from './Post/Post';
import { AuthProvider } from '../contexts/AuthContext';

function App() {
  const BrowserRouter = require('react-router-dom').BrowserRouter;
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Router>
        <AuthProvider>
          <div className="App">
            {/* Nav */}
            <Nav />
            <Switch>
              {/* Home */}
              <Route exact path="/">
                <Home />
              </Route>
              {/* Profile */}
              {/* exact path to /profile/uid */}
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route path="/post">
                <Post />
              </Route>
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    </BrowserRouter>
  );
}

export default App;

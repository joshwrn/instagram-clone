import '../styles/app.css';
import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Profile from './Profile/Profile.jsx';
import Post from './Post/Post';
import SignUp from './SignUp/SignUp';
import Settings from './Settings/Settings';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

function App() {
  const BrowserRouter = require('react-router-dom').BrowserRouter;

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Router>
        <AuthProvider>
          <div className="App">
            {/*//+ Nav */}
            <Nav />
            <Switch>
              {/*//+ Home */}
              <Route exact path="/">
                <Home />
              </Route>
              {/*//+ Sign up */}
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
              {/*//+ Profile */}
              <Route
                exact
                path="/profile/:uid"
                render={(props) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Profile {...props} />
                )}
              />
              {/*//+ post */}
              <Route
                exact
                path="/post/:uid/:postid"
                render={(props) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <Post {...props} />
                )}
              />
              {/*//+ settings */}
              <Route exact path="/settings">
                <Settings />
              </Route>
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    </BrowserRouter>
  );
}

export default App;

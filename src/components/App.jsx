import '../styles/app.css';
import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Profile from './Profile/Profile.jsx';

function App() {
  const BrowserRouter = require('react-router-dom').BrowserRouter;
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Router>
        <div className="App">
          {/* Nav */}
          <Nav />
          <Switch>
            {/* Home */}
            <Route exact path="/">
              <Home />
            </Route>
            {/* Profile */}
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </BrowserRouter>
  );
}

export default App;

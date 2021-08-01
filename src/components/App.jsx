import '../styles/app.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Post from './Post/Post';
import SignUp from './SignUp/SignUp';
import Settings from './Settings/Settings';
import Messages from './Messages/Messages';
import { AuthProvider } from '../contexts/AuthContext';

function App() {
  const BrowserRouter = require('react-router-dom').BrowserRouter;
  // memory leak from auth provider context even when everything is removed
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Router>
        <AuthProvider>
          <div className="App">
            {/*//+ Nav */}
            <Nav />
            <Switch>
              {/*//+ Home */}
              <Route exact path="/instagram-clone">
                <Home />
              </Route>
              {/*//+ Messages */}
              <Route exact path="/messages/:uid" component={Messages} />
              <Route exact path="/messages">
                <Messages />
              </Route>
              {/*//+ Sign up */}
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
              {/*//+ Profile */}
              <Route exact path="/profile/:uid" component={Profile} />
              {/*//+ post */}
              <Route exact path="/post/:uid/:postid" component={Post} />
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

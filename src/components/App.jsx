import '../styles/app.css';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Post from './Post/Post';
import SignUp from './SignUp/SignUp';
import Settings from './Settings/Settings';
import Messages from './Messages/Messages';
import { AuthProvider } from '../contexts/AuthContext';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <div className="App">
          {/*//+ Nav */}
          <Nav />
          {/*//+ Home */}
          <Route exact path="/">
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
        </div>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;

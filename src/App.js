import React from 'react';
import { Router, Route } from "react-router-dom";
import { createStore } from "redux";
import { generateReducers, set, get, reset, push, del } from "automate-redux";

import './App.less';
import history from "./history";
import Landing from './pages/landing/landing.jsx';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Profile from './pages/profile/profile';
import Chatbot from './pages/chatbot/chatbot';

const initialState = { user: {username: 'user', pass: '', role: null} };
export const store = createStore(generateReducers(initialState));

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/chatbot" component={Chatbot} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
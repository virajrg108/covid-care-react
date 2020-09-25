import React from 'react';
import { Button, Divider } from 'antd';
import { generateReducers, set, get, reset, push, del } from "automate-redux";

import history from '../../history';
import './landing.scss';
import Icon from '../../img/icon1.png';
import { store } from '../../App';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  handleRedirect = (page) => {
    history.push('/'+page);
  }
  render() {
    // console.log(get(store.getState(), "user"))
    return (
      <div className="landing">
        <div className="landing-content">
          <img className="icon" src={Icon} />
          <div className="title">Covid Care</div>
          <div className="btn-wrapper">
            <Button type="primary" size="large" className="login-btn" onClick={()=>this.handleRedirect('login')}>Login</Button>
            <Divider type="vertical" />
            <Button type="primary" size="large" className="login-btn" onClick={()=>this.handleRedirect('signup')}>Sign Up</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
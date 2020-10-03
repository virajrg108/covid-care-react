import React from 'react';
import { Button, Divider, Layout, Menu, Col, Row, Input, message } from 'antd';
import { generateReducers, set, get, reset, push, del } from "automate-redux";
import axios from 'axios';
import fetch from 'node-fetch';

import history from '../../history';
import Topbar from '../../components/topbar';
import './login.scss';
import Icon from '../../img/icon.png';
import { store } from '../../App';

// mock server - https://844171e3-d749-453e-9e27-605c39f74c8d.mock.pstmn.io
const { Header, Content, Footer } = Layout;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', pass: '' }
  }
  handleChange = e => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  handleLogin = () => {
    let body = {
      email: this.state.email,
      password: this.state.pass
    }
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then(response => {
        return response.json();
      }).then(data => {
        if (data.status == 200) {
          console.log(data);
          message.success('Login successful !');
          store.dispatch(set("user", { email: this.state.email, role: data.role, name: data.name, gender: data.gender, age: data.age }));
          store.dispatch(set("firstTime", false ));
          if(data.role=="patient")
            history.push('/profile');
          else 
            history.push('/patientsList');
        } else {
          message.error('Login unsuccessful !');
          this.setState({ username: '', pass: '' })
        }
      }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
        message.error('Login Unsuccessful!');
      });

    //--------Mock----------//
    // store.dispatch(set("user", { username: this.state.username, role: 'Patient', firstTime: true }));
    // history.push('/profile');
    //-----Mock-Ends--------//

  }
  render() {
    return (
      <Layout className="login">
        <Topbar  title={'Covid Care'} tabs={[]} selected="profile" />
        <Content style={{ padding: '0 50px' }} className="login-content">
          <Row justify="center" style={{ width: '100%' }}>
            <Col xs={24} sm={20} md={6} className="login-form-wrapper">
              <div className="login-title">LOGIN</div>
              <div className="login-form">
                <Input className="login-inp" size="large" placeholder="Email Adress" name="email" value={this.state.email} onChange={this.handleChange} />
                <Input className="login-inp" size="large" placeholder="Password" name="pass" value={this.state.pass} onChange={this.handleChange} type="password" />
                <Button className="login-btn" type="primary" size="large" onClick={this.handleLogin}>Submit</Button>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Login;
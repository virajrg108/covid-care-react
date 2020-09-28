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
    this.state = { username: '', pass: '' }
  }
  handleChange = e => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  handleLogin = () => {
    let body = {
      username: this.state.username,
      pass: this.state.pass
    }
    // fetch('http://localhost:5000/login', {
    //   method: 'POST',
    //   mode: 'cors',
    //   credentials: 'same-origin',
    //   body: JSON.stringify(body),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    // })
    //   .then(response => {
    //     console.log(response);
    //     return response.json();
    //   }).then(data => {
    //     // Work with JSON data here
    //     console.log(data);
    //     if (data.status == 200) {
    //       message.success('Login successful !');
    //       store.dispatch(set("user", { username: this.state.username, role: data.role }));
    //       history.push('/home');
    //     } else {
    //       message.error('Login unsuccessful !');
    //       this.setState({ username: '', pass: '' })
    //     }
    //   }).catch(err => {
    //     // Do something for an error here
    //     console.log("Error Reading data " + err);
    //     message.error('Login Unsuccessful!');
    //   });

    //--------Mock----------//
    store.dispatch(set("user", { username: this.state.username, role: 'Patient', firstTime: true }));
    history.push('/profile');
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
                <Input className="login-inp" size="large" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
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
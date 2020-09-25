import React from 'react';
import { Button, Divider, Layout, Menu, Col, Row, Input } from 'antd';
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
  handleRedirect = (page) => {
    history.push('/' + page);
  }
  handleLogin = () => {
    let body = {
      username: this.state.username,
      pass: this.state.pass
    }
    fetch('http://localhost:5000/login', {
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
        console.log(response);
        return response.json();
      }).then(data => {
        // Work with JSON data here
        console.log(data);
      }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
    // axios({
    //   method: 'post',
    //   url: 'http://127.0.0.1:5000/login',
    //   // url: 'https://carecov.free.beeceptor.com/login',
    //   data: {
    //     username: this.state.username,
    //     pass: this.state.pass
    //   }
    // }).then((response) => {
    //   if (response.status == 200) {
    //     console.log('Login Successful!!');
    //     console.log(response.data);
    //     return;
    //   }
    //   else
    //     console.log('Login unsuccessful');

    // }, (error) => {
    //   console.log('Login unsuccessful');
    //   console.log(error);
    // });
  }
  render() {
    return (
      <Layout className="login">
        <Topbar showMenu={true} title={'Covid Care'} tabs={{ profile: 'none', dashboard: 'none', chatbot: 'none' }} />
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
import React from 'react';
import { Button, Divider, Layout, Menu, Col, Row, Input, message, Checkbox } from 'antd';
import { generateReducers, set, get, reset, push, del } from "automate-redux";
import axios from 'axios';
import fetch from 'node-fetch';

import history from '../../history';
import Topbar from '../../components/topbar';
import '../login/login.scss';
import Icon from '../../img/icon.png';
import { store } from '../../App';

// mock server - https://844171e3-d749-453e-9e27-605c39f74c8d.mock.pstmn.io
const { Header, Content, Footer } = Layout;
const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', pass: '', email: '', errorEmail: false, role:'Patient' }
  }
  handleChange = e => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
    if(name=='email') {
      this.setState({ errorEmail: !re.test(String(this.state.email).toLowerCase()) })
    }
  }
  handleChangeCheckBox = value => {
    this.setState({role: value[0]})
  }
  handleRedirect = (page) => {
    history.push('/' + page);
  }
  handleLogin = () => {
    if(!re.test(String(this.state.email).toLowerCase())) {
      this.setState({errorEmail: true});
      message.warn('Please enter valid email ID !!');
      return;
    }
    let body = {
      username: this.state.username,
      pass: this.state.pass,
      email: this.state.email,
      role: this.state.role,

    }
    fetch('http://localhost:5000/register', {
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
        if (data.status == 200) {
          message.success('Login successful !');
          store.dispatch(set("user", { username: this.state.username, role: data.role }));
          history.push('/home');
        } else {
          message.error('Login unsuccessful !');
          this.setState({ username: '', pass: '' })
        }
      }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
        message.error('Login Unsuccessful!');
      });
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
                <Input validating={false} className={this.state.errorEmail?"login-inp error-inp":"login-inp"} size="large" placeholder="Email address" name="email" value={this.state.email} onChange={this.handleChange} />
                <Input className="login-inp" size="large" placeholder="Password" name="pass" value={this.state.pass} onChange={this.handleChange} type="password" />
                <Checkbox.Group className="login-inp" name="role" options={['Doctor', 'Patient']} value={this.state.role} onChange={this.handleChangeCheckBox} />
                <Button className="login-btn" type="primary" size="large" onClick={this.handleLogin}>Submit</Button>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Signup;
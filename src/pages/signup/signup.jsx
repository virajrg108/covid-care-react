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

const { Header, Content, Footer } = Layout;
const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', pass: '', email: '', role:'' }
  }
  handleChange = e => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  handleChangeCheckBox = value => {
    this.setState({role: value[0]})
  }
  handleRedirect = (page) => {
    history.push('/' + page);
  }
  handleLogin = () => {
    let body = {
      name: this.state.name,
      password: this.state.pass,
      email: this.state.email,
      role: this.state.role,

    }
    console.log(body);
    fetch('http://localhost:5000/signup', {
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
          store.dispatch(set("user", { name: this.state.name, role: data.role, email: this.state.email }));
          store.dispatch(set("firstTime", true ));
          history.push('/chatbot');
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
        <Topbar  title={'Covid Care'} tabs={[]} selected="profile" />
        <Content style={{ padding: '0 50px' }} className="login-content">
          <Row justify="center" style={{ width: '100%' }}>
            <Col xs={24} sm={20} md={6} className="login-form-wrapper">
              <div className="login-title">SIGN UP</div>
              <div className="login-form">
                <Input className="login-inp" size="large" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} />
                <Input  className="login-inp" size="large" placeholder="Email address" name="email" value={this.state.email} onChange={this.handleChange} />
                <Input className="login-inp" size="large" placeholder="Password" name="pass" value={this.state.pass} onChange={this.handleChange} type="password" />
                <Checkbox.Group className="login-inp" name="role" options={['doctor', 'patient']} value={this.state.role} onChange={this.handleChangeCheckBox} />
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
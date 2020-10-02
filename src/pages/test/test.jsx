import React from 'react';
import { Button, Divider, Layout, Menu, Col, Row, Input, message } from 'antd';
import { generateReducers, set, get, reset, push, del } from "automate-redux";
import axios from 'axios';
import fetch from 'node-fetch';

import history from '../../history';
import Topbar from '../../components/topbar';
import './test.scss';
import Icon from '../../img/icon.png';
import { store } from '../../App';

// mock server - https://844171e3-d749-453e-9e27-605c39f74c8d.mock.pstmn.io
const { Header, Content, Footer } = Layout;
const MenuHandler = [
  { role: 'Patient', tabs: [{ name: 'Profile', value: 'profile' }, { name: 'Daily test', value: 'test' }, { name: 'Chatbot', value: 'chatbot' }] },
  { role: 'Doctor', tabs: [{ name: 'Dashboard', value: 'Dashboard' }, { name: 'Daily test', value: 'test' }] }
]
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: get(store.getState(), "user") };
    console.log();
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
    //       history.push('/profile');
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
    store.dispatch(set("user", { username: this.state.username, role: 'Patient' }));
    history.push('/');
    //-----Mock-Ends--------//

  }
  render() {
    return (
      <Layout className="test">
        <Topbar title={'Covid Care'} tabs={this.state.user.role && this.state.user.role == 'Patient' ? MenuHandler[0].tabs : MenuHandler[1].tabs} selected="profile" />
        <Content style={{ padding: '0 50px' }} className="login-content">
          <Row justify="center" style={{ width: '100%' }}>
            <Col xs={24} sm={24} md={14} className="login-form-wrapper">
              <div className="login-title">TESTS</div>
              <div className="login-form">
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={11}>
                    Co-RADs
                  </Col>
                  <Col xs={24} sm={24} md={11}>
                    <Input className="login-inp" placeholder="Value" name="username" value={this.state.username} onChange={this.handleChange} />
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={11} >
                    Test 2
                  </Col>
                  <Col xs={24} sm={24} md={11}>
                    <Input className="login-inp" placeholder="Value" name="username" value={this.state.username} onChange={this.handleChange} />
                  </Col>
                </Row>
                <div style={{textAlign:'center'}}>
                  <Button className="login-btn" type="primary" size="large" onClick={this.handleLogin}>Submit</Button>

                </div>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Profile;
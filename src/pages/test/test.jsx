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
const MenuHandler = { role: 'Patient', tabs: [{ name: 'Profile', value: 'profile' }, { name: 'Daily test', value: 'test' }, { name: 'Chatbot', value: 'chatbot' }] }

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: get(store.getState(), "user"), corads: '', hrct: '' };
    console.log();
  }
  handleChange = e => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  handleRedirect = (page) => {
    history.push('/' + page);
  }
  handleSubmit = () => {
    let body = {
      email: 'v',
      corads: parseInt(this.state.corads),
      hrct: parseInt(this.state.hrct)
    }
    fetch('http://localhost:5000/test', {
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
          store.dispatch(set("user.severity", data.testResult ));
          history.push('/profile');
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
      <Layout className="test">
        <Topbar title={'Covid Care'} tabs={MenuHandler.tabs} selected="takeTest" />
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
                    <Input className="login-inp" placeholder="Value" name="corads" value={this.state.corads} onChange={this.handleChange} />
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={11} >
                    HRCT
                  </Col>
                  <Col xs={24} sm={24} md={11}>
                    <Input className="login-inp" placeholder="Value" name="hrct" value={this.state.hrct} onChange={this.handleChange} />
                  </Col>
                </Row>
                <div style={{textAlign:'center'}}>
                  <Button className="login-btn" type="primary" size="large" onClick={this.handleSubmit}>Submit</Button>

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
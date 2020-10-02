import React from 'react';
import { Button, Divider, Layout, Menu, Col, Row, Table, message } from 'antd';
import { generateReducers, set, get, reset, push, del } from "automate-redux";
import axios from 'axios';
import fetch from 'node-fetch';

import history from '../../history';
import Topbar from '../../components/topbar';
import './monitor.scss';
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
    this.state = { user: get(store.getState(), "user"), currPatient: get(store.getState(), "patient") };
    console.log(get(store.getState(), "patient"), 'monitor');
    this.columns = [
      {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
      },
      {
        title: 'Condition',
        dataIndex: 'condition',
        key: 'condition',
      },
      {
        title: 'Respiratory Rate',
        dataIndex: 'respRate',
        key: 'respRate',
      },
      {
        title: 'Oxygen Saturation',
        dataIndex: 'oxSat',
        key: 'oxSat',
      },
      {
        title: 'B. P.',
        dataIndex: 'bp',
        key: 'bp',
      },
      {
        title: 'Temperature',
        dataIndex: 'temp',
        key: 'temp',
      }
    ];
    this.data = [
      {
        "timestamp": 15788783,
        "condition": "better",
        "respRate": 72,
        "oxSat": 23,
        "bp": 180,
        "temp": 120,
      },
      {
        "timestamp": 15788783,
        "condition": "better",
        "respRate": 72,
        "oxSat": 23,
        "bp": 180,
        "temp": 120,
      },
      {
        "timestamp": 15788783,
        "condition": "better",
        "respRate": 72,
        "oxSat": 23,
        "bp": 180,
        "temp": 120,
      },
      {
        "timestamp": 15788783,
        "condition": "better",
        "respRate": 72,
        "oxSat": 23,
        "bp": 180,
        "temp": 120,
      }
    ]
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
      <Layout className="profile">
        <Topbar title={'Covid Care'} tabs={this.state.user.role && this.state.user.role == 'Patient' ? MenuHandler[0].tabs : MenuHandler[1].tabs} selected="profile" />
        <Content style={{ padding: '0 50px' }} className="login-content">
          <Row justify="center" style={{ width: '100%' }}>
            <Col xs={24} sm={24} md={16} className="login-form-wrapper">
              <div className="login-title">MONITOR PATIENT</div>
              <Row className="login-form" justify="center">
                <Col xs={24} sm={24} md={10} style={{ marginBottom: '20px' }}>
                  <Row justify="space-between">
                    <Col xs={24} sm={24} md={11} style={{ marginBottom: '20px' }}>
                      <div className="modal-label">Email</div>
                      <div>{this.state.currPatient.email}</div>
                    </Col>
                    <Col xs={24} sm={24} md={11} style={{ marginBottom: '20px' }}>
                      <div className="modal-label">Age</div>
                      <div>{this.state.currPatient.age}</div>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col xs={24} sm={24} md={11} style={{ marginBottom: '20px' }}>
                      <div className="modal-label">Gender</div>
                      <div>{this.state.currPatient.gender}</div>
                    </Col>
                    <Col xs={24} sm={24} md={11} style={{ marginBottom: '20px' }}>
                      <div className="modal-label">Location</div>
                      <div>{this.state.currPatient.location}</div>
                    </Col>
                  </Row>
                </Col>
                <Table dataSource={this.data} columns={this.columns} pagination={{ defaultPageSize: 5 }} />
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Profile;
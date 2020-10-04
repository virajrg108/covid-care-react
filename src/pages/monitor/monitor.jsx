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
const MenuHandler = { role: 'Doctor', tabs: [{ name: 'Browse Patients', value: 'patientsList' }] };
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: get(store.getState(), "user"), currPatient: get(store.getState(), "currPatient") };
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
  }
  componentDidMount() {
    fetch('http://localhost:5000/record/'+this.state.currPatient.email, {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
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
          console.log(data);
          this.setState({ data: data.result})
        } else {
          message.error('Unsuccessful !');
        }
      }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
        message.error('Login Unsuccessful!');
      });
  }
  handleChange = e => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  handleRedirect = (page) => {
    history.push('/' + page);
  }
  render() {
    return (
      <Layout className="profile">
        <Topbar title={'Covid Care'} tabs={MenuHandler.tabs} selected="none" />
        <Content style={{ padding: '0 50px' }} className="login-content">
          <Row justify="center" style={{ width: '100%' }}>
            <Col xs={24} sm={24} md={16} className="login-form-wrapper">
              <div className="login-title">MONITOR PATIENT</div>
              <Row className="login-form" justify="center">
                <Col xs={24} sm={24} md={14} style={{ marginBottom: '20px' }}>
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
                <Table dataSource={this.state.data} columns={this.columns} pagination={{ defaultPageSize: 5 }} />
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}

export default Profile;
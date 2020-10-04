import React from 'react';
import { Button, Divider, Layout, Menu, Col, Row, Input, message } from 'antd';
import { generateReducers, set, get, reset, push, del } from "automate-redux";
import axios from 'axios';
import fetch from 'node-fetch';

import history from '../../history';
import Topbar from '../../components/topbar';
import './profile.scss';
import Icon from '../../img/icon.png';
import { store } from '../../App';

// mock server - https://844171e3-d749-453e-9e27-605c39f74c8d.mock.pstmn.io
const { Header, Content, Footer } = Layout;
const MenuHandler = { role: 'patient', tabs: [{ name: 'Profile', value: 'profile' }, { name: 'AI Test', value: 'chatbot' }] };
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: get(store.getState(), "user") };
  }
  handleRedirect = (page) => {
    history.push('/' + page);
  }
  render() {
    return (
      <Layout className="profile">
        <Topbar title={'Covid Care'} tabs={MenuHandler.tabs} selected="profile" />
        <Content style={{ padding: '0 50px' }} className="login-content">
          <Row justify="center" style={{ width: '100%' }}>
            <Col xs={24} sm={24} md={14} className="login-form-wrapper">
              <div className="login-title">PROFILE</div>
              <div className="login-form">
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={11} className="inp-label">
                    Name
                  </Col>
                  <Col xs={24} sm={24} md={11}>
                    <div className="login-inp" >{this.state.user.name}</div>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={11} className="inp-label">
                    Email
                  </Col>
                  <Col xs={24} sm={24} md={11}>
                    <div className="login-inp" >{this.state.user.email}</div>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={11} className="inp-label">
                    Gender
                  </Col>
                  <Col xs={24} sm={24} md={11}>
                    <div className="login-inp" >{this.state.user.gender}</div>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={11} className="inp-label">
                    Age
                  </Col>
                  <Col xs={24} sm={24} md={11}>
                    <div className="login-inp" >{this.state.user.age}</div>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col xs={24} sm={24} md={11} className="inp-label">
                    Supervising Doctor
                  </Col>
                  <Col xs={24} sm={24} md={11}>
                    <div className="login-inp" >Dr. R.D. Sharma</div>
                  </Col>
                </Row>
                {this.state.user.severity !== "none" ?
                  <>
                    <Divider orientation="left">Line of Treatment</Divider>
                    {this.state.user.severity == "mild" ?
                      <>
                        <Row justify="space-between">
                          <Col xs={24} sm={24} md={11} className="inp-label">
                            Prescribed Medicine
                          </Col>
                          <Col xs={24} sm={24} md={11}>
                            <div className="login-inp" >Amlo5 Max</div>
                          </Col>
                        </Row>
                        <Row justify="space-between">
                          <Col xs={24} sm={24} md={11} className="inp-label">
                            Medicine Frequency
                          </Col>
                          <Col xs={24} sm={24} md={11}>
                            <div className="login-inp" >Once in a day</div>
                          </Col>
                        </Row>
                      </> :
                      <Row justify="space-between">
                        <Col xs={24} sm={24} md={11} className="inp-label">
                          Nearest Hospital
                        </Col>
                        <Col xs={24} sm={24} md={11}>
                          <div className="login-inp" >M.G.M. Rugnalay</div>
                        </Col>
                      </Row>}
                  </> : <></>}
              </div>
            </Col>
          </Row>
        </Content>
      </Layout >
    )
  }
}

export default Profile;
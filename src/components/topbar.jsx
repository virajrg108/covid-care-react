import React from 'react';
import { Button, Divider, Layout, Menu, Row, Col, Drawer } from 'antd';
import { generateReducers, set, get, reset, push, del } from "automate-redux";
import { MenuOutlined } from '@ant-design/icons';

import history from '../history';
import Icon from '../img/icon1.png';
import './topbar.scss';

const { Header } = Layout;

class Topbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drawerVisible: false, menuSelectedKey:1 }
    console.log(props);
  }
  toggleDrawer = (booli) => {
    this.setState({ drawerVisible: booli });
  }
  handleRedirect = (page) => {
    history.push('/' + page);
  }
  render() {
    return (
      <Header className="topbar">
        <Drawer
          placement="left"
          closable={false}
          onClose={() => { this.toggleDrawer(false) }}
          visible={this.state.drawerVisible}
          key="left"
          className="drawer"
        >
          <div className="logo-wrapper-sm">
            <img className="logo" src={Icon} />
          </div>
          <Menu
            mode="inline"
            selectedKeys={this.state.menuSelectedKey.toString()}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" style={{display: this.props.tabs.profile}}>Profile</Menu.Item>
            <Menu.Item key="2" style={{display: this.props.tabs.dashboard}}>Dashboard</Menu.Item>
            <Menu.Item key="3" style={{display: this.props.tabs.chatbot}}>Chatbot</Menu.Item>
            <Menu.Item key="4" >Logout</Menu.Item>
          </Menu>
        </Drawer>
        <div className="menu-btn-sm-wrapper" onClick={() => { this.toggleDrawer(true) }}>
          <MenuOutlined className="menu-btn-sm" />
        </div>
        <Row justify="space-between">
          <Col span={8} className="logo-wrapper-lg">
            <img className="logo" src={Icon} />
          </Col>
          <Col sm={24} xs={24} md={8} className="title-wrapper">
            <div className="title">Covid Care</div>
          </Col>
          <Col span={8} className="menu-wrapper-lg">
            {this.props.showMenu ? <div>
              <Menu className="desktop-menu" theme="dark" mode="horizontal" selectedKeys={this.state.menuSelectedKey.toString()}>
                <Menu.Item key="1" style={{display: this.props.tabs.profile}}>Profile</Menu.Item>
                <Menu.Item key="2" style={{display: this.props.tabs.dashboard}}>Dashboard</Menu.Item>
                <Menu.Item key="3" style={{display: this.props.tabs.chatbot}}>ChatBot</Menu.Item>
                <Menu.Item key="4">Logout</Menu.Item>
              </Menu>
            </div> :
              <div>
                <Menu theme="dark" mode="horizontal" selectedKeys={this.state.menuSelectedKey.toString()}>
                  <Menu.Item key="1">Logout</Menu.Item>
                </Menu>
              </div>
            }
          </Col>
        </Row>
      </Header>
    )
  }
}

export default Topbar;
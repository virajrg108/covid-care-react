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
    this.state = { drawerVisible: false, menuSelectedKey: 1, tabs: [], selected: 'profile' }
  }
  toggleDrawer = (booli) => {
    this.setState({ drawerVisible: booli });
  }
  handleRedirect = (page) => {
    console.log(page, 'page:');
    history.push('/' + page);
  }
  componentDidMount() {
    console.log(this.props, 'componentDid');
    this.setState({ tabs: this.props.tabs, selected: this.props.selected });
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
            selectedKeys={this.state.selected}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {this.state.tabs.length != 0 ? this.state.tabs.map((obj) => {
              return <Menu.Item onClick={() => this.handleRedirect(obj.value)} key={obj.value} style={{ display: this.props.tabs.profile }}>{obj.name}</Menu.Item>
            }) : <></>}
            <Menu.Item key="4" onClick={() => this.handleRedirect('')}>Logout</Menu.Item>
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
            <Menu className="desktop-menu" theme="dark" mode="horizontal" selectedKeys={this.state.selected}>
              {this.state.tabs.length != 0 ? this.state.tabs.map((obj) => {
                return <Menu.Item onClick={() => this.handleRedirect(obj.value)} key={obj.value} style={{ display: this.props.tabs.profile }}>{obj.name}</Menu.Item>
              }) : <></>}
              <Menu.Item key="4" onClick={() => this.handleRedirect('')}>Logout</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
    )
  }
}

export default Topbar;
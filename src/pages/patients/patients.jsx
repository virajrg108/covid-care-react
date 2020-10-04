import React from 'react';
import { Button, Divider, Layout, Modal, Col, Row, Input, message, Table } from 'antd';
import { generateReducers, set, get, reset, push, del } from "automate-redux";
import axios from 'axios';
import fetch from 'node-fetch';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import history from '../../history';
import Topbar from '../../components/topbar';
import './patients.scss';
import Icon from '../../img/icon.png';
import { store } from '../../App';

// mock server - https://844171e3-d749-453e-9e27-605c39f74c8d.mock.pstmn.io
const { Header, Content, Footer } = Layout;
const MenuHandler = { role: 'Doctor', tabs: [{ name: 'Browse Patients', value: 'patientsList' }] };

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, user: get(store.getState(), "user"), patients: [], orgPatients: [], searchTxt: '', currPatient: {} };
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'location',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (record) => <Button type="primary" onClick={() => this.toggleShowModal(true, record)}>Show More </Button>,
      },
    ];
    this.patients = [
      {
        email: "sada@dee.com",
        name: "Sada Bue",
        age: 21,
        location: "Matunga, Mumbai",
        gender: "Male",
        fever: false,
        breathe: false,
        cough: true,
        weakness: false,
        travelled: false,
        contact: true,
        pneumonia: false,
        testResult: false

      },
      {
        email: "sada@dee.com",
        name: "Fada Bue",
        age: 21,
        location: "Matunga, Mumbai",
        gender: "Male",
        fever: true,
        breathe: false,
        cough: false,
        weakness: false,
        travelled: true,
        contact: true,
        pneumonia: false,
        testResult: true
      },
      {
        email: "sada@dee.com",
        name: "Mada Bue",
        age: 21,
        location: "Matunga, Mumbai",
        gender: "Male",
        fever: true,
        breathe: false,
        cough: false,
        weakness: false,
        travelled: true,
        contact: false,
        pneumonia: false,
        testResult: true
      },
      {
        email: "sada@dee.com",
        name: "Lada Bue",
        age: 21,
        location: "Matunga, Mumbai",
        gender: "Male",
        fever: false,
        breathe: true,
        cough: true,
        weakness: true,
        travelled: false,
        contact: false,
        pneumonia: true,
        testResult: true
      },
      {
        email: "sada@dee.com",
        name: "Sada Bue",
        age: 21,
        location: "Matunga, Mumbai",
        gender: "Male",
        fever: true,
        breathe: true,
        cough: false,
        weakness: false,
        travelled: false,
        contact: false,
        pneumonia: true,
        testResult: true
      }
    ];
  }
  componentDidMount() {
    fetch('http://127.0.0.1:5000/patients', {
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin'
    })
      .then(response => {
        console.log(response);
        return response.json();
      }).then(data => {
        // Work with JSON data here
        console.log(data);
        if (data.status == 200) {
          this.setState({ patients: data.data, orgPatients: data.data });
        } else {
          message.error('Fetch Unsuccessful !');
        }
      });
  }
  toggleShowModal = (booli, record = {}) => {
    this.setState({ showModal: booli, currPatient: record });
  }
  handleChange = e => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  handleRedirect = () => {
    store.dispatch(set("currPatient", this.state.currPatient ));
    history.push('/monitor');
  }
  handleFilter = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: e.target.value });
    this.setState({ patients: this.state.orgPatients.filter((obj) => { return obj.name.toLowerCase().includes(value.toLowerCase()) }) });
  }

  render() {
    return (
      <Layout className="profile">
        <Topbar title={'Covid Care'} tabs={MenuHandler.tabs} selected="none" />
        <Content style={{ padding: '0 50px' }} className="login-content">
          <Row justify="center" style={{ width: '100%' }}>
            <Col xs={24} sm={24} md={20} className="login-form-wrapper">
              <div className="login-title">BROWSE PATIENTS</div>
              <Row justify="center">
                <Col xs={24} sm={14} md={10}>
                  <Input type="large" placeholder="Search by name..." prefix={<SearchOutlined />} value={this.state.searchTxt} name="searchTxt" onChange={this.handleFilter} />
                </Col>
              </Row>
              <br />
              <Table className="patient-table" dataSource={this.state.patients} columns={this.columns} pagination={{ defaultPageSize: 5 }} />
            </Col>
          </Row>
        </Content>
        <Modal
          centered
          width={700}
          visible={this.state.showModal}
          title={this.state.currPatient.name}
          onOk={this.handleOk}
          onCancel={() => this.toggleShowModal(false)}
          footer={[
            <Button key="back" onClick={() => this.toggleShowModal(false)}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleRedirect}>
              Monitor Patient
          </Button>
          ]}
        >
          <div className="modal-body">
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
            <Divider />
            <Row justify="start">
              <Col span={12} style={{ textAlign: 'left' }}>
                {this.state.currPatient.fever ? <Right /> : <Wrong />} &nbsp; &nbsp;Fever
              </Col>
              <Col span={12} style={{ textAlign: 'left' }}>
                {this.state.currPatient.breathe ? <Right /> : <Wrong />} &nbsp; &nbsp;Short Breathe
              </Col>
            </Row><br />
            <Row justify="start">
              <Col span={12} style={{ textAlign: 'left' }}>
                {this.state.currPatient.cough ? <Right /> : <Wrong />} &nbsp; &nbsp;Cough
              </Col>
              <Col span={12} style={{ textAlign: 'left' }}>
                {this.state.currPatient.weakness ? <Right /> : <Wrong />} &nbsp; &nbsp;Weakness
              </Col>
            </Row><br />
            <Row justify="start">
              <Col span={12} style={{ textAlign: 'left' }}>
                {this.state.currPatient.travelled ? <Right /> : <Wrong />} &nbsp; &nbsp;Travelled
              </Col>
              <Col span={12} style={{ textAlign: 'left' }}>
                {this.state.currPatient.contact ? <Right /> : <Wrong />} &nbsp; &nbsp;Close Contact
              </Col>
            </Row><br />
            <Row justify="start">
              <Col span={12} style={{ textAlign: 'left' }}>
                {this.state.currPatient.pneumonia ? <Right /> : <Wrong />} &nbsp; &nbsp;Pneumonia
              </Col>
            </Row>
          </div>
        </Modal>
      </Layout>
    )
  }
}
function Right() {
  return <CheckCircleOutlined style={{ color: '#a8071a', fontSize: '22px' }} />
}
function Wrong() {
  return <CloseCircleOutlined style={{ color: '#3f6600', fontSize: '22px' }} />
}
export default Profile;
import React from 'react';
import { generateReducers, set, get, reset, push, del } from "automate-redux";
import ChatBot from 'react-simple-chatbot';
import { message } from 'antd';
import history from '../../history';

import Topbar from '../../components/topbar';
import { store } from '../../App';

import './chatbot.scss';

const MenuHandler = { role: 'patient', tabs: [{ name: 'Profile', value: 'profile' }, { name: 'AI Test', value: 'chatbot' }] };

class Chatbot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: get(store.getState(), "user"),
      // firstTime: get(store.getState(), "firstTime"),
      firstTime: get(store.getState(), "firstTime"), location: '',
      name: '', gender: 'male', age: '', fever: false, shortBreathe: false, cough: false, weakness: false, travelled: false, closeContact: false, pneumonia: false
    };
    this.firstTimeSteps = [
      {
        id: '2',
        message: `Hi ${this.state.user.name}! What is your gender?`,
        trigger: 'gender',
      },
      {
        id: 'gender',
        options: [
          { value: 'male', label: 'Male', trigger: 'ageQ' },
          { value: 'female', label: 'Female', trigger: 'ageQ' },
        ]
      },
      {
        id: 'ageQ',
        message: 'What is your age?',
        trigger: 'age',
      },
      {
        id: 'age',
        user: true,
        trigger: '3'
      },
      {
        id: '3',
        message: 'Do you have fever now?',
        trigger: 'fever',
      },
      {
        id: 'fever',
        options: [
          { value: true, label: 'Yes', trigger: '4' },
          { value: false, label: 'No', trigger: '4' },
        ]
      },
      {
        id: '4',
        message: 'Do you have short breathe?',
        trigger: 'breathe',
      },
      {
        id: 'breathe',
        options: [
          { value: true, label: 'Yes', trigger: '5' },
          { value: false, label: 'No', trigger: '5' },
        ]
      },
      {
        id: '5',
        message: 'Do you have Cough?',
        trigger: 'cough',
      },
      {
        id: 'cough',
        options: [
          { value: true, label: 'Yes', trigger: '6' },
          { value: false, label: 'No', trigger: '6' },
        ]
      },
      {
        id: '6',
        message: 'Do you have weakness?',
        trigger: 'weakness',
      },
      {
        id: 'weakness',
        options: [
          { value: true, label: 'Yes', trigger: '7' },
          { value: false, label: 'No', trigger: '7' },
        ]
      },
      {
        id: '7',
        message: 'Have you travelled somewhere since last 14 days?',
        trigger: 'travelled',
      },
      {
        id: 'travelled',
        options: [
          { value: true, label: 'Yes', trigger: '8' },
          { value: false, label: 'No', trigger: '8' },
        ]
      },
      {
        id: '8',
        message: 'Have you came into close contact with someone who is infected by coronavirus?',
        trigger: 'contact',
      },
      {
        id: 'contact',
        options: [
          { value: true, label: 'Yes', trigger: '9' },
          { value: false, label: 'No', trigger: '9' },
        ]
      },
      {
        id: '9',
        message: 'Do you have Pneumonia?',
        trigger: 'pneumonia',
      },
      {
        id: 'pneumonia',
        options: [
          { value: true, label: 'Yes', trigger: '10' },
          { value: false, label: 'No', trigger: '10' },
        ]
      },
      {
        id: '10',
        component: <Collector firstTime={this.state.firstTime} user={this.state.user} location={this.state.location} />,
        asMessage: true,
        end: true,
      },
    ];
    this.steps = [
      {
        id: '1',
        message: `Hey ${this.state.user.name}, how are you feeling today?`,
        trigger: 'condition'
      },
      {
        id: 'condition',
        options: [
          { value: 'better', label: 'Better', trigger: '2' },
          { value: 'noChange', label: 'No Change', trigger: '2' },
          { value: 'worse', label: 'Worse', trigger: '2' },
        ],
      },
      {
        id: '2',
        message: 'What is your Respiratory rate?',
        trigger: 'respRate',
      },
      {
        id: 'respRate',
        user: true,
        trigger: '3'
      },
      {
        id: '3',
        message: 'What is your oxygen saturation?',
        trigger: 'oxSat',
      },
      {
        id: 'oxSat',
        user: true,
        trigger: '4'
      },
      {
        id: '4',
        message: 'And reading of your blood pressure?',
        trigger: 'bp',
      },
      {
        id: 'bp',
        user: true,
        trigger: '5'
      },
      {
        id: '5',
        message: 'What is your body temperature?',
        trigger: 'temp',
      },
      {
        id: 'temp',
        user: true,
        trigger: '6'
      },
      {
        id: '6',
        component: <Collector firstTime={this.state.firstTime} user={this.state.user} />,
        end: true
      }
    ]
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.setState({ location: position.coords.latitude.toFixed(2).toString() + " " + position.coords.longitude.toFixed(2).toString() })
      store.dispatch(set("location", position.coords.latitude.toFixed(2).toString() + " " + position.coords.longitude.toFixed(2).toString()));
    });
  }
  render() {
    return (
      <div className="chatbot-wrapper">
        <Topbar title={'Covid Care'} tabs={MenuHandler.tabs} selected="chatbot" />
        <ChatBot className="chatbot" steps={this.state.firstTime ? this.firstTimeSteps : this.steps} />
      </div>
    )
  }
}

function Collector(props) {
  console.log(props);
  if (props.firstTime) {
    let body = {
      email: props.user.email,
      gender: props.steps.gender.value,
      age: props.steps.age.value,
      location: get(store.getState(), "location"),
      fever: props.steps.fever.value,
      breathe: props.steps.breathe.value,
      cough: props.steps.cough.value,
      weakness: props.steps.weakness.value,
      travelled: props.steps.travelled.value,
      contact: props.steps.contact.value,
      pneumonia: props.steps.pneumonia.value,
    }
    console.log(body, 'body');
    fetch('http://localhost:5000/firstchat', {
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
          // store.dispatch(set("user.age", props.steps.age.value ));
          // store.dispatch(set("user.gender", props.steps.gender.value ));
          // store.dispatch(set("user.location", props.steps.location.value ));
          if (data.testRequired) {
            message.info('Test required !');
            history.push('/takeTest');
            return;
          }
          message.info('Test not required !');
          history.push('/profile');
        } else {
          message.error('Error!');
        }
      })
  } else {
    let body = {
      email: props.user.email,
      condition: props.steps.condition.value,
      respRate: props.steps.respRate.value,
      oxSat: props.steps.oxSat.value,
      bp: props.steps.bp.value,
      temp: props.steps.temp.value
    }
    console.log(body, 'body');
    fetch('http://localhost:5000/chat', {
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
          message.info('Info recorded !');
        } else {
          message.error('Error!');
        }
      })
  }
  return <div>
    {props.firstTime ? `Processing your answers...` : `Thank you for answering the questions. Your answers have been recorded and sent for further process`}
  </div>
}

export default Chatbot;
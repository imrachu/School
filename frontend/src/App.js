import React, { Component } from 'react';
import './App.css';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup';

class App extends Component {
  constructor(props) {
    super(props);
  }

  // handleToggleClick(event) {
  //   this.setState(state => ({
  //     parameter: event.target.value
  //   }));
  // }

  render() {
    return (
      <div className="App">  
        <StudentSignup/>
      </div>
    );
  }
}

export default App;
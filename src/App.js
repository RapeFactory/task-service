import React, { Component } from 'react';
import './App.css';
import Tasks from './components/Tasks';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tasks />
      </div>
    );
  }
}

export default App;

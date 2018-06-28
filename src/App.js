import React, { Component, Fragment } from 'react';
import './App.css';
import Tasks from './components/Tasks';

class App extends Component {
  render() {
    return (
      <Fragment>
        <h2 style={{textAlign: 'center'}}>Задачи по переносу</h2>
        <div className="App">
          <Tasks />
        </div>
      </Fragment>
    );
  }
}

export default App;

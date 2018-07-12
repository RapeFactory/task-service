import React, { Component } from 'react';
import Mark from './Mark.svg';
import './Contacts.css';

class Contacts extends Component {
  render() {
    return (
      <div className="contacts">
        <a href="http://github.com/RapeFactory" about="GitHub">
          <img src={Mark} alt="GitHub"/>
        </a>
      </div>
    );
  }
}

export default Contacts;

import React, { Component } from 'react';
import { render } from 'react-dom';

import Cell from './Cell.js';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    const walls = {
      left: true,
      right: true,
      top: true,
      bottom: true,
    }
    return (
      <div>
        <p>
          Eller's Algorithm for Maze Generation in React
        </p>
        <Cell walls={walls}/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

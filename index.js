import React, { Component } from 'react';
import { render } from 'react-dom';

import Row from './Row.js';
import './style.css';

class Maze extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <p>
          Eller's Algorithm for Maze Generation in React
        </p>
        <Row />
      </div>
    );
  }
}

render(<Maze />, document.getElementById('root'));

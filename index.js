import React, { Component } from 'react';
import { render } from 'react-dom';

import Cell from './Cell.js';
import './style.css';

class Maze extends Component {
  constructor() {
    super();
    this.speed = 1000;
    this.initialWalls = {
      left: true,
      right: true,
      top: true,
      bottom: true,
    }
    this.state = {
      width: 10,
      height: 10,
      cells: [],
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      this.speed
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      cells: this.state.cells.push(<Cell walls={this.initialWalls}/>)
    });
  }

  render() {
    return (
      <div>
        <p>
          Eller's Algorithm for Maze Generation in React
        </p>
        {this.state.cells}
      </div>
    );
  }
}

render(<Maze />, document.getElementById('root'));

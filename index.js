import React, { Component } from 'react';
import { render } from 'react-dom';

import Cell from './Cell.js';
import './style.css';

class Maze extends Component {
  constructor() {
    super();
    this.currentSetID = 1;
    this.timesTicked = 0;
    this.speed = 2000;
    this.chanceToJoin = 0.3;
    this.width = 5;
    this.height = 10;
    this.initialWalls = {
      left: true,
      right: true,
      top: true,
      bottom: true,
    }
    this.state = {
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

  createRow() {
    this.setState({
      cells: [
        ...this.state.cells, 
        <Cell setID={this.currentSetID}
              walls={this.initialWalls}/>
      ]
    });
    this.currentSetID += 1;
  }

  joinSomeCells() {
    if (this.currentSetID >= this.width) {
      clearInterval(this.timerID);
      return;
    }
    const cells = this.state.cells.map((cell, i) => {
      if (i - 1 !== this.currentSetID) {
        return cell
      }
      return <Cell setID={i}
                   active={i === this.currentSetID ? true : false}
                   walls={this.initialWalls}/>
    });

    this.setState({ cells });
    
  }

  tick() {
    this.timesTicked++;
    console.log(this.timesTicked);
    if (this.state.cells.length >= this.width) {
      this.currentSetID = this.timesTicked - this.width;
      this.joinSomeCells();
      return;
    }
    this.createRow();
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

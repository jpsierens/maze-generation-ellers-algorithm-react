import React, { Component } from 'react';
import { render } from 'react-dom';

import Cell from './Cell.js';
import './style.css';

class Maze extends Component {
  constructor() {
    super();
    this.currentSetID = 0;
    this.timesTicked = 0;
    this.speed = 500;
    this.chanceToJoin = 0.3; // x100 for %
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

  willJoin() {
    return Math.random() > chanceToJoin;
  }

  joinSomeCells() {
    if (this.currentSetID > this.width) {
      clearInterval(this.timerID);
      return;
    }
    let activeCellIndex;
    const cells = this.state.cells.map((cell, i) => {
      if (i !== this.currentSetID) {
        return <Cell setID={i}
                     active={false}
                     walls={this.state.cells[i].props.walls}/>
      }
      return <Cell setID={this.currentSetID}
                   active={true}
                   walls={this.state.cells[this.currentSetID].props.walls}/>
    });

    if (this.willJoin) {
      const walls = {
        ...cells[this.currentSetID].props.walls,
        right: false,
      }
      cells[this.currentSetID] = 
        <Cell setID={this.currentSetID}
              active={true}
              walls={walls}/>


      if (this.currentSetID < this.width) {
        const nextCellWalls = {
          ...cells[this.currentSetID + 1].props.walls,
          left: false,
        }
        cells[this.currentSetID + 1] = 
          <Cell setID={this.currentSetID + 1}
                active={false}
                walls={nextCellWalls}/>
        }
    }

    this.setState({ cells });
    
  }

  tick() {
    this.timesTicked++;
    console.log(this.timesTicked);
    if (this.state.cells.length >= this.width) {
      this.currentSetID = this.timesTicked - this.width - 1;
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

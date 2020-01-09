import React, { Component } from 'react';
import { render } from 'react-dom';

import Cell from './Cell.js';
import './style.css';

class Maze extends Component {
  constructor() {
    super();
    this.currentCell = 0;
    this.timesTicked = 0;
    this.speed = 500;
    this.chanceToJoin = 0.3; // x100 for %
    this.width = 10;
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
        <Cell setID={this.currentCell}
              walls={this.initialWalls}/>
      ]
    });
    this.currentCell += 1;
  }

  willJoin() {
    return Math.random() > this.chanceToJoin;
  }

  highlightCurrentCell() {
    return this.state.cells.map((cell, i) => {
      if (i !== this.currentCell) {
        return <Cell setID={cell.props.setID}
                     active={false}
                     walls={cell.props.walls}/>
      }
      return <Cell setID={cell.props.setID}
                   active={true}
                   walls={cell.props.walls}/>
    });
  }

  joinSomeCells() {
    if (this.currentCell > this.width - 2) {
      clearInterval(this.timerID);
      return;
    }

    const cells = this.highlightCurrentCell();
    const currentCellSetId = cells[this.currentCell].props.setID;

    if (this.willJoin()) {
      const walls = {
        ...cells[this.currentCell].props.walls,
        right: false,
      }
      cells[this.currentCell] = 
        <Cell setID={currentCellSetId}
              active={true}
              walls={walls}/>

      if (this.currentCell < this.width - 1) {
        const nextCellWalls = {
          ...cells[this.currentCell + 1].props.walls,
          left: false,
        }
        cells[this.currentCell + 1] = 
          <Cell setID={currentCellSetId}
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
      this.currentCell = this.timesTicked - this.width - 1;
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

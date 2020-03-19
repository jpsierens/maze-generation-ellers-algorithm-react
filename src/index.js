import React, { Component } from 'react';
import { render } from 'react-dom';

import Row from './Row.js';
import Actions from './Actions.js';
import './style.css';

class Maze extends Component {
  constructor() {
    super();
    this.state = {
      height: 10,
      width: 10,
      rows: [],
      completed: false,
      // the less chance, the more vertical walls
      chanceToJoin: 0.5,
    }

    this.resetMaze = this.resetMaze.bind(this);
    this.setDimension = this.setDimension.bind(this);
    this.setChance = this.setChance.bind(this);
  }

  startMaze() {
    this.setState({
      rows: [
        <Row index={0} 
             width={this.state.width}
             chanceToJoin={this.state.chanceToJoin}
             cells={false}
             previousRowCells={false}
             sendRowState={this.receiveCompleteRow.bind(this)} />
      ]
    })
  }

  receiveCompleteRow(cells, index) {
    // Done with the maze
    if (index === this.state.height - 1) {
      this.setState({ completed: true })
      return
    }

    // last row
    if (index === this.state.height - 2) {
      this.setState({
        rows: [
          ...this.state.rows,
          <Row index={index + 1} 
               width={this.state.width}
               chanceToJoin={this.state.chanceToJoin}
               previousRowCells={cells}
               lastRow={true}
               sendRowState={this.receiveCompleteRow.bind(this)} />
        ]
      });
      return;
    }

    this.setState({
      rows: [
        // react saves the state for the previous rows so we just need
        // to spread them here again
        ...this.state.rows,
        // the new row
        <Row index={index + 1} 
             width={this.state.width}
             chanceToJoin={this.state.chanceToJoin}
             previousRowCells={cells}
             sendRowState={this.receiveCompleteRow.bind(this)} />
      ]
    });
  }

  setDimension(dimension, event) {
    if (dimension === 'width') {
      this.setState({ width: Number(event.target.value) });
      return
    }
    this.setState({ height: Number(event.target.value) });
  }

  setChance(event) {
    this.setState({ chanceToJoin: event.target.value });
  }

  resetMaze() {
    if (!this.state.rows.length) {
      this.startMaze();
      return;
    }
    this.setState({ rows: [], completed: false });
  }

  render() {
    const { rows, completed } = this.state;

    return (
      <div>
        <h3>
          Eller's Algorithm for Perfect Maze Generation in React
        </h3>

        <Actions width={this.state.width}
                 height={this.state.height}
                 rows={this.state.rows}
                 chanceToJoin={this.state.chanceToJoin}
                 startMaze={this.startMaze}
                 resetMaze={this.resetMaze}
                 setDimension={this.setDimension} 
                 setChance={this.setChance}/>

        <div className={`maze ${completed ? 'completed' : ''}`}>
          {rows}
        </div>
      </div>
    );
  }
}

render(<Maze />, document.getElementById('root'));

import React, { Component } from 'react';
import { render } from 'react-dom';

import Row from './Row.js';
import './style.css';

class Maze extends Component {
  constructor() {
    super();
    this.height = 10;
    this.width = 10;
    this.state = {
      rows: [],
      cells: []
    }
  }

  componentDidMount() {
    this.setState({
      rows: [
        <Row index={0} 
             width={this.width}
             cells={false}
             previousRowCells={false}
             sendRowState={this.receiveCompleteRow.bind(this)} />
      ]
    })
  }

  receiveCompleteRow(cells, index) {
    if (index === 3) {
      return;
    }
    const newCells = [...this.state.cells];
    newCells[index] = cells;

    // the old rows
    const rows = this.state.rows.map((row, i) => {
      return <Row index={i} 
                  width={this.width}
                  cells={newCells[i]}
                  previousRowCells={false}
                  sendRowState={this.receiveCompleteRow.bind(this)} />
    })
    this.setState({
      cells: newCells,
      rows: [
        ...this.state.rows,
        // the new row
        <Row index={index + 1} 
             width={this.width}
             cells={false}
             previousRowCells={newCells[index]}
             sendRowState={this.receiveCompleteRow.bind(this)} />
      ]
    });
  }

  render() {
    return (
      <div>
        <p>
          Eller's Algorithm for Maze Generation in React
        </p>
        {this.state.rows}
      </div>
    );
  }
}

render(<Maze />, document.getElementById('root'));

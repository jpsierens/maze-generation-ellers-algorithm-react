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
    if (index === this.width - 1) {
      return;
    }

    // last one
    if (index === this.width - 2) {
      this.setState({
        rows: [
          // react saves the state for the previous rows so we just need
          // to spread them here again
          ...this.state.rows,
          // the new row
          <Row index={index + 1} 
               width={this.width}
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
             width={this.width}
             previousRowCells={cells}
             sendRowState={this.receiveCompleteRow.bind(this)} />
      ]
    });
  }

  render() {
    return (
      <div>
        <p>
          Eller's Algorithm for Perfect Maze Generation in React
        </p>
        {this.state.rows}
      </div>
    );
  }
}

render(<Maze />, document.getElementById('root'));

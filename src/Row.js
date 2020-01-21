import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import Cell from './Cell.js'

class Row extends Component {
  constructor(props) {
    super(props);
    // the index of the cell inside the row
    this.currentCell = 0;
    this.timesTicked = 0;
    this.speed = 100;
    this.chanceToJoin = 0.66; // x100 for %
    this.initialWalls = {
      left: true,
      right: true,
      top: true,
      bottom: false,
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
    let newCell;
    const {previousRowCells} = this.props;
    // if its not first, check if there will be a 
    // random vertical connection
    if (previousRowCells && this.willJoin()) {
      const walls = {
        ...this.initialWalls,
        top: false
      }
      newCell = <Cell setID={previousRowCells[this.currentCell].props.setID}
                      walls={walls}/>;
    } else {
      // adding the row index as a multiple of 10 to the currentCell
      // we make sure that the setID hasn't been used before
      newCell = <Cell setID={this.props.index*10 + this.currentCell}
                      walls={this.initialWalls}/>;
    }

    this.setState({
      cells: [
        ...this.state.cells, 
        newCell
      ]
    });
    this.currentCell += 1;
  }


  willJoin() {
    return Math.random() < this.chanceToJoin;
  }

  getCellsAndHighlightCurrent() {
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

  joinCellToSet(cells, currentCellSetId) {
    const walls = {
      ...cells[this.currentCell].props.walls,
      right: false,
    }
    return (
      <Cell setID={currentCellSetId}
            active={true}
            walls={walls}/>
    );
  }

  joinCellToLastSet(cells) {
    const walls = {
      ...cells[this.currentCell].props.walls,
      left: false,
    }
    return (
      <Cell setID={cells[this.currentCell - 1].props.setID}
            active={true}
            walls={walls}/>
    );
  }

  joinSomeCells() {
    // after ensuring vertical connections
    if (this.currentCell > this.props.width) {
      clearInterval(this.timerID);
      // remove the active style
      const cells = this.state.cells.map((cell, i) => {
  
        return <Cell setID={cell.props.setID}
                     active={false}
                     walls={cell.props.walls}/>
      });
      this.setState({ cells });
      // tell the Maze that the row is done, so we can pass
      // the state of the row to the next Row
      this.props.sendRowState(this.state.cells, this.props.index);
      return;
    }
    // after the rows have been joined
    if (this.currentCell > this.props.width - 1) {
      this.ensureVerticalConnections();
      return;
    }

    let cells = this.getCellsAndHighlightCurrent();
    const currentCellSetId = cells[this.currentCell].props.setID;

    if (this.willJoin() && this.currentCell < this.props.width - 1) {
      cells[this.currentCell] = this.joinCellToSet(cells, currentCellSetId);
    }

    // if the current cell must be joined to the previous cell
    // whether it will join or not was decided on the previous tick
    // we just do the join in this tick so that it visually looks like
    if (cells[this.currentCell - 1] && !cells[this.currentCell - 1].props.walls.right) {
      cells[this.currentCell] = this.joinCellToLastSet(cells);
    }

    // if last set, give bottom walls
    // TODO: the merges above are being overwritten
    if (this.props.lastRow) {
      cells = this.state.cells.map((cell, i) => {
        const walls = { ...cell.props.walls, bottom: true };
        return <Cell setID={cell.props.setID}
                     active={false}
                     walls={walls}/>
      });
    }

    this.setState({ cells });
  }

  // after the row has been created, ensure that atleast
  // one vertical connection exists per set
  // if not, randomly assign one
  ensureVerticalConnections() {
    if (!this.props.previousRowCells) {
      return;
    }
    
    // with form {[setID]: cellsBelongingToSet[]}
    const setMap = {};
    this.state.cells.forEach((cell,i) => {
      const setID = cell.props.setID;
      if (!setMap[setID]) {
        setMap[setID] = [];
      }
      setMap[setID].push(i);
    });

    const cellsToAddVerticalConnection = Object.keys(setMap).map(key => {
      let hasAVerticalConnection = false;
      setMap[key].forEach(cellIndex => {
        if (!this.state.cells[cellIndex].props.walls.top) {
          hasAVerticalConnection = true;
        }
      });

      if (hasAVerticalConnection) return null;
      // randomly choose a vertical connection
      return setMap[key][Math.floor(Math.random() * setMap[key].length)];
    });

    console.log(setMap);
    console.log(cellsToAddVerticalConnection);
    const cells = this.state.cells.map((cell, i) => {
      if (!cellsToAddVerticalConnection.includes(i)) {
        return cell;
      }
      // last cell remove the active
      if (i === this.props.width - 1) {
        return <Cell setID={cell.props.setID}
                     active={false}
                     walls={cell.props.walls}/>
      }
      const walls = {
        ...cell.props.walls,
        top: false,
      }

      return <Cell setID={cell.props.setID}
                   active={true}
                   walls={walls}/>
    });
    console.log(cells);
    // set state
    this.setState({ cells });
    
  }

  tick() {
    this.timesTicked++;

    if (this.state.cells.length === this.props.width) {
      this.currentCell = this.timesTicked - this.props.width - 1;
      this.joinSomeCells();
      return;
    }

    this.createRow();
  }

  render() {
    return <div>{this.state.cells}</div>
  }
}

Row.propTypes = {
  width: PropTypes.number,
  index: PropTypes.number,
  sendRowState: PropTypes.func
};

export default Row;

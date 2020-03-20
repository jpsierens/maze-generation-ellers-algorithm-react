import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Gets the list of stargazers for this repo from Github and ouputs it
 */
class StarGazers extends Component {
  constructor() {
    super();

    this.state = {
      stargazers: []
    }
  }

  componentDidMount() {
    fetch(this.props.apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const stargazers = data.map(gazers => gazers.login);
        this.setState({ stargazers });
      });
  }

  render() {
    return (
      <div>
        <div>
          <a className="github-button" 
             href={this.props.projectUrl}
             data-icon="octicon-star"
             data-size="large"
             data-show-count="true"
             aria-label="Star jpsierens/maze-generation-ellers-algorithm-react on GitHub">
              Star
          </a>
        </div>

        <div className="love-text">Thanks for the love:</div>

        <ul>
          {this.state.stargazers.map(gazer => <li key={gazer}>{gazer}</li>)}
        </ul>
      </div>
    );
  }
}

StarGazers.propTypes = {
  projectUrl: PropTypes.string,
  apiUrl: PropTypes.string,
};

export default StarGazers;
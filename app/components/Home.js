// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const tempStyle = {
  position: 'absolute',
  top: '30%',
  left: '30%',
  textAlign: 'left'
};

const btnStyle = {
  position: 'absolute',
  top: '2%',
  left: '2%'
};

export default class Home extends Component {
  props: {
    username: string,
    githubLogout: () => void
  };

  render() {
    return (
      <div>
        <button style={btnStyle} onClick={this.props.githubLogout}>Logout</button>
        <div style={tempStyle} data-tid="container" >
          <h2>Welcome back {this.props.username.split(' ')[0]}</h2>
          <Link to="/counter">to Counter</Link>
          <br />
          <Link to="/panelView">test the Question/History panel</Link>
          <br />
          <Link to="/editor">Editor</Link>
          <br />
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";

export class StateTest extends Component {
  state = { counter: 1 };
  componentDidMount() {

    // this.state.counter += 1;

    // this.setState({counter: this.state.counter + 1});
    // this.setState({counter: this.state.counter + 1});
    // this.setState({counter: this.state.counter + 1});
    this.setState(state => ({counter: state.counter+1}));
    this.setState(state => ({counter: state.counter+1}));
    this.setState(state => ({counter: state.counter+1}));
    
  }
  render() {
    return <div>{this.state.counter}</div>;
  }
}

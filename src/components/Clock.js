import React, { Component } from "react";

export class Clock extends Component {
  constructor(props) {
    super(props);
    // 设定状态初始值
    this.state = { date: new Date() };
  }
  componentDidMount() {
    // 组件挂载
    this.timerID = setInterval(() => {
      this.setState({
        date: new Date()
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    return <div>{this.state.date.toLocaleTimeString()}</div>;
  }
}

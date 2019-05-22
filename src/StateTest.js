import React, { Component } from "react";

class Clock extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { date: new Date() };
  //   }
  state = { date: new Date(), counter: 1 };

  componentDidMount() {
    this.timer = setInterval(() => {
      //   setState修改状态
      this.setState({ date: new Date() });
    }, 1000);

    // 批量操作：对同一个key多次操作会合并，会执行最后一次
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ counter: this.state.counter + 1 }, ()=>{
        console.log('cb'+this.state.counter); // 2
    });
    console.log(this.state.counter); // 1

    this.setState(prev => {
      console.log(prev.counter); // 2
      return prev.counter;
    });

    setTimeout(() => {
      console.log(this.state.counter); // 2
    }, 0);

    document.body.addEventListener("click", this.changeCounter);
  }

  changeCounter = () => {
    this.setState({ counter: this.state.counter + 1 });
    console.log(this.state.counter); // 3
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        {this.state.date.toLocaleTimeString()}
        <p>{this.state.counter}</p>
      </div>
    );
  }
}

export default class StateTest extends Component {
  render() {
    return (
      <div>
        <Clock />
      </div>
    );
  }
}

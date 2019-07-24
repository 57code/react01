// 用户事件处理
import React, { Component } from "react";

export default class EventHandle extends Component {
  

  constructor(props) {
    super(props)

    this.state = {
        name: ""
      };

    //   this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <p>{this.state.name}</p>
      </div>
    );
  }
}

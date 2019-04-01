import React, { Component } from "react";
import logo from '../logo.svg';

export default class JsxTest extends Component {
  formatName(user) {
    return user.firstName + " " + user.lastName;
  }
  render() {
    const name = "Jerry Yang";
    const user = { firstName: "Jerry", lastName: "Yang" };
    const greet = <p>hello, Jerry</p>
    return (
      <div>
        <h1>{name}</h1>
        <h1>{this.formatName(user)}</h1>
        <img src={logo} style={{width: '100px'}} className="img"></img>
        {greet}
      </div>
    );
  }
}

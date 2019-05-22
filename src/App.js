import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import JsxTest from "./JsxTest";
import CompType from "./CompType";
import StateTest from "./StateTest";
import CartSample from './CartSample';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* 自定义组件开头大写 */}
        <JsxTest />
        {/* 组件类型 */}
        {/* <CompType /> */}
        {/* 状态 */}
        {/* <StateTest /> */}
        {/* 购物车 */}
        <CartSample></CartSample>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";

import "./App.css";
import JsxTest from "./components/JsxTest";
import Cart from "./components/Cart";
import { Welcome1, Welcome2 } from "./components/CompType";
import { Clock } from "./components/Clock";
import { StateTest } from "./components/StateTest";
import CartSample from "./components/CartSample";
import Lifecycle from "./components/Lifecycle";

class App extends Component {
  state = { prop: "some content" };
  componentDidMount() {
    this.setState({ prop: "new content" });

    setTimeout(() => {
      this.setState({ prop: "" });
    }, 2000);
  }
  render() {
    return (
      <div>
        {/* <JsxTest></JsxTest>
        <Cart></Cart>*/}
        {/* <Welcome1 name="你好"></Welcome1> 
        <Welcome2 name="雷猴"></Welcome2> */}
        {/* <Clock></Clock> */}
        {/* <StateTest></StateTest> */}
        {/* <CartSample></CartSample> */}
        {this.state.prop && <Lifecycle prop={this.state.prop} />}
      </div>
    );
  }
}

export default App;

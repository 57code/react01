import React, { Component } from "react";

import "./App.css";
import JsxTest from "./components/JsxTest";
import Cart from "./components/Cart";
import { Welcome1, Welcome2 } from "./components/CompType";
import { Clock } from "./components/Clock";
import { StateTest } from "./components/StateTest";
import CartSample from "./components/CartSample";
import Lifecycle from "./components/Lifecycle";
import ErrorBoundary from "./components/ErrorBoundary";
import AntdSample from "./components/AntdTest";
import CommentList from './components/Comment';
import Hoc from './components/Hoc';
import Composition from './components/Composition'

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
        <ErrorBoundary>
          {/* <JsxTest></JsxTest>
        <Cart></Cart>*/}
          {/* <Welcome1 name="你好"></Welcome1> 
        <Welcome2 name="雷猴"></Welcome2> */}
          {/* <Clock></Clock> */}
          {/* <StateTest></StateTest> */}
          {/* <CartSample></CartSample> */}
          {/* {this.state.prop && <Lifecycle prop={this.state.prop} />} */}
          {/* <AntdSample></AntdSample> */}
          {/* <CommentList></CommentList> */}
          {/* <Hoc stage="React"></Hoc> */}
          <Composition></Composition>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;

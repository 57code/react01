import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Hoc from "./Hoc";
import JsxTest from "./JsxTest";
import CompType from "./CompType";
import StateTest from "./StateTest";
import CartSample from "./CartSample";

// import Button from 'antd/lib/button'
// import "antd/dist/antd.css"
import { Button } from "antd";
import CommentList from "./CommentList";
import Composition from "./Composition";
import ContextTest from "./ContextTest";
import HookTest from "./HookTest";
import AntdForm from "./AntdForm";
import KFormTest from "./KFormTest";

class App extends Component {
  render() {
    return (
      <div>
        {/* 自定义组件开头大写 */}
        {/* <JsxTest /> */}
        {/* 组件类型 */}
        {/* <CompType /> */}
        {/* 状态 */}
        {/* <StateTest /> */}
        {/* 购物车 */}
        {/* <CartSample></CartSample> */}
        {/* <Button type="primary">Button</Button> */}
        {/* <CommentList /> */}
        {/* 高阶组件 */}
        {/* <Hoc name="hoc"/> */}
        {/* 组件复合 */}
        {/* <Composition /> */}
        {/* 上下文 */}
        {/* <ContextTest /> */}
        {/* <HookTest /> */}
        {/* 组件设计与实现 */}
        {/* <AntdForm /> */}
        <KFormTest />
      </div>
    );
  }
}

export default App;

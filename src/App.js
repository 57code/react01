import React from "react";
import JsxTest from "./components/JsxTest";
import StateMgt from "./components/StateMgt";
import EventHandle from "./components/EventHandle";
import ContextTest from "./components/ContextTest";
import HocTest from "./components/HocTest.js";
import Composition from "./components/Composition";
import HooksTest from "./components/HooksTest";
import WrappedNormalLoginForm from "./components/FormTest";

// import Button from 'antd/lib/button'
// import "antd/dist/antd.css"

import {Button} from 'antd';
import KFormTest from './components/KFormTest';
import Dialog, {Dialog2} from './components/Dialog';
import Tree from './components/Tree';
import CommentList from './components/CommentList';
import ReduxTest from './components/ReduxTest';
import MyReduxTest from './components/MyReduxTest';
import RouterTest from './components/RouterTest';
import MyRouterTest from './components/MyRouterTest';

// 函数式组件
// class App extends Component {
//   render() {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <JsxTest />
//       </div>
//     );
//   }
// }
function App(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      {/* <JsxTest /> */}
      {/* 状态管理 */}
      {/* <StateMgt /> */}
      {/* 事件处理 */}
      {/* <EventHandle /> */}
      {/* 上下文 */}
      {/* <ContextTest /> */}
      {/* Hoc */}
      {/* <HocTest /> */}
      {/* 组件复合 */}
      {/* <Composition /> */}
      {/* Hooks */}
      {/* <HooksTest /> */}
      {/* <Button>mua~</Button> */}
      {/* <WrappedNormalLoginForm></WrappedNormalLoginForm> */}
      {/* <KFormTest></KFormTest> */}
      {/* <Dialog>
        somthing!!!!
      </Dialog>
      <Dialog2>
        fjfjfjfj
      </Dialog2> */}
      {/* <Tree></Tree> */}
      {/* <CommentList></CommentList> */}
      {/* <ReduxTest></ReduxTest> */}
      {/* <MyReduxTest></MyReduxTest> */}
      {/* <RouterTest></RouterTest> */}
      <MyRouterTest></MyRouterTest>
    </div>
  );
}

export default App;

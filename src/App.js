import React from "react";
import JsxTest from "./components/JsxTest";
import StateMgt from "./components/StateMgt";
import EventHandle from "./components/EventHandle";
import ContextTest from "./components/ContextTest";
import HocTest from "./components/HocTest.tsx";
import Composition from "./components/Composition";
import HooksTest from "./components/HooksTest";

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
      <HooksTest />
    </div>
  );
}

export default App;

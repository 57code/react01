import React, { Component } from "react";

// 如果组件仅供展示内容
function Welcome1(props) {
  return (
    <div>
      Welcome1, {props.name} - {props.age}
    </div>
  );
}

class Welcome2 extends Component {
  render() {
    return (
      <div>
        Welcome2, {this.props.name} - {this.props.age}
      </div>
    );
  }
}

export default function CompType() {
  return (
    <div>
      {/* 属性是只读的不能改 */}
      {/* 将嵌套复杂的组件抽取为更小的组件是最佳实践 */}
      <Welcome1 name="tom" age="20" />
      <Welcome2 name="jerry" age="20" />
    </div>
  );
}

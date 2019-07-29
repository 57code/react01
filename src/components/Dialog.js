import React, { Component } from "react";
import {
  createPortal,
  unmountComponentAtNode,
  unstable_renderSubtreeIntoContainer
} from "react-dom";

export class Dialog2 extends React.Component {
  // render一个null，目的什么内容都不渲染
  render() {
    return null;
  }

  componentDidMount() {
    // 首次挂载时候创建宿主div
    const doc = window.document;
    this.node = doc.createElement("div");
    doc.body.appendChild(this.node);

    this.createPortal(this.props);
  }

  componentDidUpdate() {
    this.createPortal(this.props);
  }

  componentWillUnmount() {
    // 清理节点
    unmountComponentAtNode(this.node);
    //   清理宿主div
    window.document.body.removeChild(this.node);
  }

  createPortal(props) {
    unstable_renderSubtreeIntoContainer(
      this, //当前组件
      <div className="dialog">{props.children}</div>, // 塞进传送门的JSX
      this.node // 传送门另一端的DOM node
    );
  }
}

export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.node = document.createElement("div");
    document.body.appendChild(this.node);
  }

  render() {
    // 将createPortal参数1声明的jsx挂载到node上
    return createPortal(<div>{this.props.children}</div>, this.node);
  }

  // 清理div
  componentWillUnmount() {
    document.body.removeChild(this.node);
  }
}

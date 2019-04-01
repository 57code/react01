import React, { Component } from "react";

export default class CartSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [
        { id: 1, text: "Web全栈架构师", price: 666 },
        { id: 2, text: "Python爬虫训练营", price: 666 }
      ]
    };
  }
  render() {
    return (
      <div>
        {/* 条件渲染：条件成立返回jsx */}
        {this.props.title && <h1>{this.props.title}</h1>}
        {/* 列表渲染：将数据映射为jsx */}
        <ul>
          {this.state.goods.map(good => (
            <li key={good.id}>{good.text}</li>
          ))}
        </ul>
      </div>
    );
  }
}

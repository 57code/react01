import React, { Component } from "react";
import logo from "../logo.svg";
// import './index.css';
import style from "../index.module.css";

export default class JsxTest extends Component {
  render() {
    // React类负责逻辑控制，比如修改数据 -> vdom
    // ReactDOM类负责渲染，vdom -> dom
    // babel-loader可以转换jsx -> vdom,
    // <h1>React真帅</h1> => React.createElement('h1', 'React真帅')
    // 变量使用, 只要是合法js表达式
    const name = "React真帅";

    const user = { firstName: "tom", lastName: "jerry" };
    function formatName(user) {
      return user.firstName + " " + user.lastName;
    }

    const greet = <p>hello,jerry</p>;

    // 由于条件语句或者循环语句不是合法表达式
    // const title = name ? <h1>{name}</h1> : null;

    // 数组会作为一组子元素对待
    // 处理循环的方式
    const arr = [1, 2, 3].map(num => <li key={num}>{num}</li>);

    return (
      <div>
        {/* 条件语句 */}
        {name ? <h1>{name}</h1> : null}
        {/* 函数也是合法表达式 */}
        <p>{formatName(user)}</p>
        {/* jsx本身也是合法表达式 */}
        {greet}
        {/* 数组处理 */}
        {/* 显示列表 */}
        <ul>{arr}</ul>
        {/* 属性使用: 静态值用双引号，动态值用花括号 */}
        {/* class、for关键字要特殊处理 */}
        <img
          src={logo}
          alt="logo"
          style={{ width: 100 }}
          className={style.img2}
        />
        {/* <label htmlFor=""></label> */}
      </div>
    );
  }
}

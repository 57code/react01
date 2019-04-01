import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Welcome1, Welcome2 } from './components/CompType';
import Clock from './components/Clock';
import StateTest from './components/StateTest';
import CartSample from './components/CartSample';
import Lifecycle from './components/Lifecycle';


function formatName(user) {
  return user.firstName + " " + user.lastName;
}

class App extends Component {
  state = {prop:'some prop'}
  componentDidMount(){
    this.setState({prop:'a new prop'})

    setTimeout(() => {
      this.setState({prop:''})
    }, 2000);
    
  }
  render() {
    const name = "jerry";
    const user = { firstName: "tom", lastName: "jerry" };
    const jsx = <p>hello, jerry</p>;
    return (
      <div>
        {/* 表达式 */}
        {/* <h1>{name}</h1>
        <h1>{formatName(user)}</h1> */}

        {/* 属性 */}
        {/* <img src={logo} style={{width:'100px'}} /> */}

        {/* jsx也是表达式 */}
        {/* {jsx} */}
        {/* 使用其他组件 */}
        {/* <Welcome1 name="some content"></Welcome1>
        <Welcome2 name="some content"></Welcome2> */}

        {/* State和状态改变setState */}
        {/* <Clock></Clock> */}
        {/* <StateTest></StateTest> */}

        {/* 条件与循环 */}
        {/* <CartSample title="购物车"></CartSample> */}

        {/* 生命周期 */}
        {this.state.prop && <Lifecycle prop={this.state.prop}></Lifecycle>}
      </div>
    );
  }
}

export default App;

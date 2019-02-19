import React, { Component } from "react";

//Dialog
function Dialog(props) {
  return (
    <div style={{ border: `4px solid ${props.color || "blue"}` }}>
      {/* 等效vue中匿名插槽 */}
      {props.children}
      {/* 等效vue中具名插槽 */}
      <div className="abc">{props.footer}</div>
    </div>
  );
}

function WelcomeDialog() {
  const confirmBtn = (
    <button onClick={() => alert("react确实好！")}>确定</button>
  );
  return (
    <Dialog color="green" footer={confirmBtn}>
      <h1>欢迎光临</h1>
      <p>感谢使用react！！！</p>
    </Dialog>
  );
}

// 模拟接口
const api = {
  getUser: ()=>({name: 'jerry', age: 20})
}


function Fetcher(props) {
  let user = api[props.name]();
  return props.children(user);
}

function FilterP(props) {
  return (
    <div>
      {/* React.Children提供若干操作嵌套内容的帮助方法 */}
      {React.Children.map(props.children, child => {
        console.log(child); // vdom
        if (child.type != 'p') { // 过滤掉非p标签
          return;
        }
        return child;
      })}
    </div>
  )
}

function RadioGroup(props){
  return (
    <div>
      {React.Children.map(props.children, child => {
        return React.cloneElement(child, {name: props.name})
      })}
    </div>
  )
}

function Radio({children, ...rest}){
  return (
    <label>
      <input type="radio" {...rest}/> {children}
    </label>
  )
}

export default class Composition extends Component {
  render() {
    return (
      <div>
        <WelcomeDialog />
        {/* children内容可以是任意表达式 */}
        <Fetcher name="getUser">
          {({name, age}) => (<p>{name}-{age}</p>)}
        </Fetcher>
        {/* 操作children */}
        <FilterP>
          <h3>React</h3>
          <p>react很不错</p>
          <h3>Vue</h3>
          <p>vue也不错</p>
        </FilterP>
        {/* 编辑children */}
        <RadioGroup name="mvvm">
          <Radio value="vue">vue</Radio>
          <Radio value="react">react</Radio>
          <Radio value="angular">angular</Radio>
        </RadioGroup>
      </div>
    );
  }
}

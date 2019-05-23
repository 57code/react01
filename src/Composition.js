import React, { Component } from "react";

function Dialog(props) {
  const color = props.color || "blue";
  return (
    <div style={{ border: `4px solid ${color}` }}>
      {/* children是固定名称，类似于匿名插槽 */}
      {props.children()}
      <div>{props.foo("这个内容是dialog传递的")}</div>
      <div>
        {/* 具名插槽 */}
        {props.footer}
      </div>
    </div>
  );
}

// WelcomeDialog通过复合提供内容
function WelcomeDialog() {
  const footer = <button onClick={() => alert("react")}>确定</button>;
  return (
    //   传递任意合法表达式
    <Dialog color="red" footer={footer} foo={c => <p>{c}</p>}>
      {c => (
        <div>
          <h1>欢迎光临</h1>
          <p>感谢使用react</p>
        </div>
      )}
    </Dialog>
  );
}

function FilterP(props) {
  return (
    <div>
      {React.Children.map(props.children, child => {
        console.log(child); // vdom
        if (child.type !== "p") {
          return;
        }
        return child;
      })}
    </div>
  );
}

function RadioGroup(props) {
  // 将name属性赋值给所有Radio
  return (
    <div>
      {React.Children.map(props.children, child =>
        React.cloneElement(child, { name: props.name })
      )}
    </div>
  );
}

function Radio(props) {
  return (
    <label>
      <input type="radio" name={props.name} />
      {props.children}
    </label>
  );
}

export default function Composition() {
  return (
    <>
      <WelcomeDialog />
      <FilterP>
        <h1>foo</h1>
        <p>bar</p>
        <h1>mike</h1>
        <p>jerry</p>
      </FilterP>

      <RadioGroup name="mvvm">
        <Radio value="vue">vue</Radio>
        <Radio value="react">react</Radio>
        <Radio value="angular">angular</Radio>
      </RadioGroup>
    </>
  );
}

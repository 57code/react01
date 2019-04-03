import React from "react";

// Dialog作为容器不关心内容和逻辑
function Dialog(props) {
  return (
    <div style={{ border: `4px solid ${props.color || "blue"}` }}>
      {props.children}
      <div className="footer">{props.footer}</div>
    </div>
  );
}
// WelcomeDialog通过复合提供内容
function WelcomeDialog(props) {
  return (
    <Dialog {...props}>
      <h1>欢迎光临</h1>
      <p>感谢使用react</p>
    </Dialog>
  );
}

function Filter(props) {
  return (
    <div>
      {/* React.Children提供若干操作嵌套内容的帮助方法 */}
      {React.Children.map(props.children, child => {
        console.log(child); // vdom
        // 忽略非p元素
        if (child.type != props.type) return;
        return child;
      })}
    </div>
  );
}

// 期望用法
{
  /* <RadioGroup name="mvvm">
  <Radio value="vue">vue</Radio>
  <Radio value="react">react</Radio>
  <Radio value="ng">angular</Radio>
</RadioGroup>; */
}

function RadioGroup(props) {
  // 不可行,
  // React.Children.forEach(props.children, child => {
  // child.props.name = props.name;
  // });
  return (
    <div>
      {React.Children.map(props.children, child => {
        // 要修改child属性必须先克隆它
        return React.cloneElement(child, { name: props.name });
      })}
    </div>
  );
}
// Radio传入value,name和children，注意区分
function Radio({ children, ...rest }) {
  return (
    <label>
      <input type="radio" {...rest} />
      {children}
    </label>
  );
}

export default function CompotionSample() {
  const confirmBtn = <button onClick={() => alert("react确实好")}>确定</button>;
  return (
    <>
      <RadioGroup name="mvvm">
        <Radio value="vue">vue</Radio>
        <Radio value="react">react</Radio>
        <Radio value="ng">angular</Radio>
      </RadioGroup>
    </>
  );
}

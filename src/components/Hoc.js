import React from "react";

const withLog = Comp => {
    console.log(Comp.name + "渲染了");
    return props => <Comp {...props} />;
  };
  const withKaikeba = Comp => {
    return class NewComp extends React.Component {
      componentDidMount() {
        // 重写生命周期
        console.log("do something");
      }
      render() {
        return <Comp {...this.props} name="开课吧高阶组件" />;
      }
    };
  };
  

// Kaikeba作为展示组件不关心数据来源，只负责显示逻辑
@withLog
@withKaikeba
@withLog
class Kaikeba extends React.Component {
  render() {
    return (
      <div>
        {this.props.stage} - {this.props.name}
      </div>
    )
  }
}
export default Kaikeba
// function Kaikeba(props) {
//   return (
//     <div>
//       {props.stage} - {props.name}
//     </div>
//   );
// }
// 高阶组件withKaikeba负责获取特定数据并包装Kaikeba组件
// const withKaikeba = Comp => {
//   return props => {
//     // {...props}将属性展开传递下去
//     return <Comp {...props} name="开课吧高阶组件" />;
//   };
// };

// 导出的实际是包装后的组件
// export default withLog(withKaikeba(withLog(Kaikeba)));

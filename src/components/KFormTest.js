import React, { Component } from "react";

// 2.扩展表单的高阶组件，提供输入控件包装、事件处理、表单校验等
function kFormCreate(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.options = {}; // 各字段选项
      this.state = {}; // 各字段值
    }

    handleChange = e => {
      let { name, value } = e.target;
      this.setState({ [name]: value }, () => {
        // 校验:注意回调中调用
        this.validateField(name);
      });
    };
    // 校验指定字段
    validateField = field => {
      const rules = this.options[field].rules; // 获取校验规则
      // 只要有任何一项校验失败就返回true跳出，对返回值取反表示校验失败
      const ret = !rules.some(rule => {
        if (rule.required) {
          // 仅验证必填项
          if (!this.state[field]) {
            // 校验失败
            this.setState({
              // 错误信息设置
              [field + "Message"]: rule.message
            });
            return true; // 若有校验失败，返回true
          }
        }
      });
      // 若校验成功，清除错误信息
      if (ret) this.setState({ [field + "Message"]: "" });
      return ret;
    };

    // 校验所有字段
    validate = cb => {
      // 将选项中所有field组成的数组转换为它们校验结果数组
      const rets = Object.keys(this.options).map(field => {
        return this.validateField(field);
      });
      // 校验结果中每一项都要求true
      const ret = rets.every(v => v == true);
      cb(ret, this.state);
    };

    // 返回包装输入控件的高阶组件，代理其事件处理、赋值等操作
    // field字段名，options选项，InputComp输入控件
    getFieldDec = (field, option) => {
      this.options[field] = option;
      return InputComp => (
        <div>
          {/* 由React.createElement生成的元素不能修改，需要克隆一份再扩展 */}
          {React.cloneElement(InputComp, {
            name: field, // 控件name
            value: this.state[field] || "", // 控件值
            onChange: this.handleChange // 控件change事件处理
          })}
          {this.state[field + "Message"] && (
            <p style={{ color: "red" }}>{this.state[field + "Message"]}</p>
          )}
        </div>
      );
    };
    render() {
      return (
        <div>
          <Comp
            {...this.props}
            getFieldDec={this.getFieldDec}
            validate={this.validate}
          />
        </div>
      );
    }
  };
}

@kFormCreate
class KFormTest extends Component {
  onSubmit = () => {
    this.props.validate((isValid, data) => {
      if (isValid) {
        console.log("提交登录", data);
      } else {
        alert("校验失败");
      }
    });
  };
  render() {
    // 结构出扩展的方法
    const { getFieldDec } = this.props;
    return (
      <div>
        {getFieldDec("uname", {
          rules: [{ required: true, message: "请输入用户名" }]
        })(<input type="text" />)}
        {getFieldDec("pwd", {
          rules: [{ required: true, message: "请输入密码" }]
        })(<input type="password" />)}
        <button onClick={this.onSubmit}>登录</button>
      </div>
    );
  }
}

export default KFormTest;

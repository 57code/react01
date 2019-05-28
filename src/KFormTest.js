import React from "react";
import {Icon} from 'antd'

//高阶组件：扩展现有表单，提供控件包装、事件处理、表单校验
function kFormCreate(Comp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      // 选项
      this.options = {};
      //   数据
      this.state = {};
    }

    // 处理输入事件
    handleChange = e => {
      // 数据设置和校验
      const { name, value } = e.target;
      this.setState({ [name]: value }, () => {
        // 单字段校验
        this.validateField(name);
      });
    };

    validateField = field => {
      const rules = this.options[field].rules;
      // some里面任何一项不通过就返回true跳出，取反表示校验失败
      const isValid = !rules.some(rule => {
        if (rule.required) {
          if (!this.state[field]) {
            //校验失败
            this.setState({
              [field + "Message"]: rule.message
            });
            return true;
          }
        }

        return false;
      });

      if (isValid) {
        this.setState({
          [field + "Message"]: ""
        });
      }

      return isValid;
    };

    validateFields = cb => {
      const rets = Object.keys(this.options).map(field =>
        this.validateField(field)
      );
      const ret = rets.every(v => v === true);
      cb(ret, this.state);
    };

    // 焦点处理，错误获取等
    handleFocus = e => {
      const field = e.target.name;
      this.setState({
        [field + "Focus"]: true
      });
    };

    isFieldTouched = field => {
      return !!this.state[field + "Focus"];
    };

    getFieldError = field => {
      return this.state[field + "Message"];
    };

    // 包装函数：接收字段名和校验选项返回一个高阶组件
    getFieldDec = (field, option) => {
      this.options[field] = option; // 选项告诉我们如何校验
      return InputComp => (
        <div>
          {React.cloneElement(InputComp, {
            name: field,
            value: this.state[field] || "",
            onChange: this.handleChange, //执行校验设置状态等
            onFocus: this.handleFocus //焦点处理
          })}
        </div>
      );
    };

    render() {
      return (
        <Comp
          getFieldDec={this.getFieldDec}
          validateFields={this.validateFields}
          isFieldTouched={this.isFieldTouched}
          getFieldError={this.getFieldError}
        />
      );
    }
  };
}

class FormItem extends React.Component {
  render() {
    return (
      <div>
        {/* 默认插槽内容 */}
        {this.props.children}
        {this.props.help && (
          <p
            style={{
              color: this.props.validateStatus === "error" ? "red" : "green"
            }}
          >
            {this.props.help}
          </p>
        )}
      </div>
    );
  }
}

class KInput extends React.Component {
  render() {
    const {prefix, ...rest} = this.props;
    return (
      <div>
        {prefix}
        <input {...rest}/>
      </div>
    );
  }
}

@kFormCreate
class KFormTest extends React.Component {
  onSubmit = () => {
    this.props.validateFields((isValid, values) => {
      if (isValid) {
        console.log(values);
        alert("登录啦！");
      } else {
        alert("校验失败！");
      }
    });
  };
  render() {
    // 获取表单项错误
    const { getFieldDec, isFieldTouched, getFieldError } = this.props;
    const unameError = isFieldTouched("username") && getFieldError("username");
    return (
      <div>
        <FormItem validateStatus="error" help={unameError || ""}>
          {getFieldDec("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<KInput type="text" prefix={<Icon type="user" />} />)}
        </FormItem>
        <div>
          {getFieldDec("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(<KInput type="text" prefix={<Icon type="lock" />} />)}
        </div>

        <button onClick={this.onSubmit}>登录</button>
      </div>
    );
  }
}
export default KFormTest;

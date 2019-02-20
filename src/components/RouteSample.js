import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";
import { connect, Provider } from "react-redux";
import { login } from "../store/user.redux";
import store from "../store";

function App(props) {
  return (
    <div>
      {/* 导航链接 */}
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/foo">foo</Link>
        </li>
      </ul>
      {/* 路由配置 */}
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/about" component={About} /> */}
        <PrivateRoute path="/about" component={About} />
        <Route path="/detail/:course" component={Detail} />
        <Route path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

// 路由守卫：定义可以验证的高阶组件
@connect(state => ({ isLogin: state.user.isLogin }))
class PrivateRoute extends Component {
  render() {
    const { isLogin, component: Component, ...rest } = this.props;
    // redner和component选项二选一
    return (
      <Route
        {...rest}
        render={props =>
          isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location.pathname }
              }}
            />
          )
        }
      />
    );
  }
}

// 接口
const auth = {
  isLogin: false,
  login(cb) {
    this.isLogin = true;
    setTimeout(cb, 300);
  }
};

// 登录组件
@connect(
  state => ({ isLogin: state.user.isLogin }),
  {
    login
  }
)
class Login extends Component {
  render() {
    // 回调地址
    const from = this.props.location.state.from || "/";
    if (this.props.isLogin) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <p>请先登录</p>
        <button onClick={this.props.login}>登录</button>
      </div>
    );
  }
}

function NoMatch(props) {
  return <div>404页面</div>;
}

function Home({ location }) {
  console.log("接收参数：", location.state);

  return (
    <div>
      <ul>
        <li>
          <Link to="/detail/web">Web</Link>
        </li>
        <li>
          <Link to="/detail/python">Python</Link>
        </li>
        <li>
          <Link to="/detail/java">Java</Link>
        </li>
      </ul>
    </div>
  );
}
function Detail({ match, history, location }) {
  // match - 参数获取等路由信息
  // history - 导航
  // location - url定位
  console.log(match, history, location);

  return (
    <div>
      {/* 获取参数 */}
      {match.params.course}
      {/* 命令式导航 */}
      <button onClick={history.goBack}>后退</button>
      <button
        onClick={() => history.push({ pathname: "/", state: { foo: "bar" } })}
      >
        回到首页
      </button>
    </div>
  );
}
function About() {
  return (
    <div>
      {/* 显示用户信息和订单 */}
      <h2>用户中心</h2>
      <div>
        <Link to="/about/me">个人信息</Link>
        <Link to="/about/order">订单</Link>
      </div>
      <Switch>
        <Route path="/about/me" component={() => <div>我的信息</div>} />
        <Route path="/about/order" component={() => <div>订单信息</div>} />
        {/* 重定向 */}
        <Redirect to="/about/me" />
      </Switch>
    </div>
  );
}

export default class RouteSample extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
  }
}

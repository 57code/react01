import React, { useState, useEffect, useReducer, useContext } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Link, Route, Redirect, Switch } from "react-router-dom";
import { login } from "./store/user.redux";
import { asyncFetch } from "./store/fruit.redux";

function FruitList({ fruits, setFruit }) {
  return (
    <div>
      <ul>
        {fruits.map(f => (
          <li key={f} onClick={() => setFruit(f)}>
            <Link to={`/list/detail/${f}`}>{f}</Link>
          </li>
        ))}
      </ul>
      <Route path="/list/detail/:fruit" component={Detail} />
    </div>
  );
}

const FruitAdd = connect()(function({ dispatch }) {
  const [pname, setPname] = useState("");

  const onAddFruit = e => {
    if (e.key === "Enter") {
      dispatch({ type: "add", payload: pname });
      setPname("");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={pname}
        onChange={e => setPname(e.target.value)}
        onKeyDown={onAddFruit}
      />
    </div>
  );
});

function Detail({ match, history, location }) {
  console.log(match, history, location);

  return (
    <div>
      <h3>{match.params.fruit}的详情</h3>
      <p>...</p>
      <div>
        <button onClick={history.goBack}>返回</button>
      </div>
    </div>
  );
}

// 创建高阶组件包装Route组件使其可以验证用户登录态
const PrivateRoute = connect(state => ({
  isLogin: state.user.isLogin
}))(function({ component: Component, isLogin, ...rest }) {
  // 结构props为component和rest
  // rest为传递给Route的属性
  return (
    <Route
      {...rest}
      render={
        // 执行登录判断逻辑从而动态生成组件
        props =>
          isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { redirect: props.location.pathname } // 重定向地址
              }}
            />
          )
      }
    />
  );
});

const Login = connect(
  state => ({
    isLogin: state.user.isLogin
  }),
  { login }
)(function({ location, isLogin, login }) {
  const redirect = location.state.redirect || "/"; // 重定向地址

  if (isLogin) return <Redirect to={redirect} />;

  return (
    <div>
      <p>用户登录</p>
      <hr />
      <button onClick={login}>登录</button>
    </div>
  );
});

function HookTest({ fruits, loading, asyncFetch }) {
  // useState参数是状态初始值
  // 返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
  const [fruit, setFruit] = useState("草莓");
  //   const [fruits, setFruits] = useState([]);

  // 使用useEffect操作副作用
  //   请务必设置依赖选项，如果没有则设置空数组表示仅执行一次
  useEffect(() => {
    console.log("get fruits");
    // dispatch({ type: "init", payload: ["草莓", "香蕉"]});

    asyncFetch(["草莓", "香蕉"]);
    // loadingStart();
    // setTimeout(() => {
    //   //   setFruits(["草莓", "香蕉"]);
    //   loadingEnd();
    //   init(["草莓", "香蕉"]);
    // }, 1000);
  }, []);

  useEffect(() => {
    document.title = fruit;
  }, [fruit]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("应用启动了");
    }, 1000);

    // 返回清除函数
    return function() {
      clearInterval(timer);
    };
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">水果列表</Link>|<Link to="/add">添加水果</Link>
      </nav>

      <div>
        <Switch>
          <Route
            path="/list"
            render={() =>
              loading ? (
                <div>数据加载中...</div>
              ) : (
                <FruitList fruits={fruits} setFruit={setFruit} />
              )
            }
          />
          <PrivateRoute path="/add" component={FruitAdd} />
          <Route path="/login" component={Login} />
          <Route component={() => <h3>页面不存在</h3>} />
        </Switch>

        {/* <Redirect to="/list"></Redirect> */}
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  fruits: state.fruit.list,
  loading: state.fruit.loading
});
const mapDispatchToProps = {
  asyncFetch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HookTest);

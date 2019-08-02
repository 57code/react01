import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from "react-router-dom";

function ProductList(props) {
  return (
    <div>
      <h3>ProductList</h3>
      <Link to="/detail/web">web全栈</Link>
    </div>
  );
}
function Detail({ match, history, location }) {
  console.log(match, history, location);

  return (
    <div>
      <h3>Detail</h3>
      {match.params.name}
      <button onClick={history.goBack}>后退</button>
    </div>
  );
}
function ProductMgt(props) {
  return (
    <div>
      <h3>ProductMgt</h3>
      <Link to="add">新增</Link>
      <Link to="search">搜索</Link>
      <Route path="/management/add" component={() => <div>add</div>} />
      <Route path="/management/search" component={() => <div>search</div>} />
      <Redirect to="/management/add" />
    </div>
  );
}

// 路由守卫：定义一个PrivateRoute组件
// 为其扩展一个用户状态检查功能
function PrivateRoute({ component: Component, isLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        // props === ({ match, history, location })
        props =>
          isLogin ? (
            <Component />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { redirect: props.location.pathname }
              }}
            />
          )
      }
    />
  );
}

export default class RouterTest extends Component {
  render() {
    return (
      <BrowserRouter>
        <nav>
          <Link to="/">商品列表</Link>
          <Link to="/management">商品管理</Link>
        </nav>

        {/* 路由配置 */}
        {/* react-router匹配不是独占的 */}
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/detail/:name" component={Detail} />
          <PrivateRoute path="/management" component={ProductMgt} isLogin={true} />
          <Route path="/login" component={() => <div>login page</div>} />
          <Route component={() => <h3>页面不存在</h3>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

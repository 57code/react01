import React, { Component } from "react";
import { createBrowserHistory } from "history";
import pathToRegexp from "path-to-regexp";

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

// /detail/web <==> /detail/:name
function compilePath(path, options) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

  if (pathCache[path]) return pathCache[path];

  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  const result = { regexp, keys };

  if (cacheCount < cacheLimit) {
    pathCache[path] = result;
    cacheCount++;
  }

  return result;
}

/**
 * Public API for matching a URL pathname to a path.
 */
function matchPath(pathname, options = {}) {
  if (typeof options === "string") options = { path: options };

  // 用户在Route上配置的path
  const { path, exact = false, strict = false, sensitive = false } = options;

  const paths = [].concat(path);

  return paths.reduce((matched, path) => {
    if (!path) return null;
    if (matched) return matched;

    // detail/web/1
    const { regexp, keys } = compilePath(path, {
      end: exact,
      strict,
      sensitive
    });
    const match = regexp.exec(pathname);

    if (!match) return null;

    const [url, ...values] = match;
    const isExact = pathname === url;

    if (exact && !isExact) return null;

    return {
      path, // the path used to match
      url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }, null);
}

//创建一个上下文保存history、location等
const RouterContext = React.createContext();

// Router：管理历史记录变更，location变更等等，并传递给后代
class BrowserRouter extends Component {
  constructor(props) {
    super(props);

    // 创建浏览器history对象
    this.history = createBrowserHistory(this.props);

    // 创建状态管理location
    this.state = {
      location: this.history.location
    };

    // 开启监听
    this.unlisten = this.history.listen(location => {
      this.setState({ location });
    });
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.history,
          location: this.state.location
        }}
        children={this.props.children}
      />
    );
  }
}

class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const location = context.location;

          // 根据pathname和用户传递props获得match对象
          const match = matchPath(location.pathname, this.props);

          // 要传递一些参数
          const props = { ...context, match };

          // children component render
          let { children, component, render } = this.props;

          if (children && typeof children === "function") {
            children = children(props);
          }

          return (
            <RouterContext.Provider value={props}>
              {children // children优先级最高，不论匹配与否存在就执行
                ? children
                : (props.match // 后面的component和render必须匹配
                ? (component // 若匹配首先查找component
                  ? React.createElement(component) // 若它存在渲染之
                  : (render // 若render选项存在
                  ? render(props) // 按render渲染结果
                  : null))
                : null)}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

class Link extends React.Component {
  handleClick(event, history) {
    event.preventDefault();
    history.push(this.props.to);
  }

  render() {
    const { to, ...rest } = this.props;

    return (
      <RouterContext.Consumer>
        {context => {
          return (
            <a
              {...rest}
              onClick={event => this.handleClick(event, context.history)}
              href={to}
            >
              {this.props.children}
            </a>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

export default class MyRouterTest extends Component {
  render() {
    return (
      <BrowserRouter>
        <Link to="/foo">foo</Link>
        <Link to="/bar">bar</Link>
        <Link to="/mua/abc">mua</Link>
        <Route path="/foo" component={() => <div>foo</div>} />
        <Route path="/bar" component={() => <div>bar</div>} />
        <Route path="/mua/:ns" render={({ match }) => match.params.ns} />
        <Route children={({location}) => "xxx"} />
      </BrowserRouter>
    );
  }
}

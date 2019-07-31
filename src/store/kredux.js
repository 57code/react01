export function createStore(reducer, enhancer) {
  // 如果存在enhancer
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let currentState = undefined;
  const currentListeners = []; // 回调函数数组

  function getState() {
    return currentState;
  }
  // 更新状态
  function dispatch(action) {
    // 修改
    currentState = reducer(currentState, action);
    // 变更通知
    currentListeners.forEach(v => v());
    return action;
  }
  function subscribe(cb) {
    currentListeners.push(cb);
  }

  // 初始化状态
  dispatch({ type: "@IMOOC/KKB-REDUX" });

  return {
    getState,
    dispatch,
    subscribe
  };
}

export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    // 完成之前createStore工作
    const store = createStore(...args);
    // 原先dispatch
    let dispatch = store.dispatch;
    // 传递给中间件函数的参数
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    };
    // 将来中间件函数签名如下： funtion ({}) {}
    //[fn1(dispatch),fn2(dispatch)] => fn(diaptch)
    const chain = middlewares.map(mw => mw(midApi));
    // 强化dispatch,让他可以按顺序执行中间件函数
    dispatch = compose(...chain)(store.dispatch);
    // 返回全新store，仅更新强化过的dispatch函数
    return {
      ...store,
      dispatch
    };
  };
}

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  // 聚合函数数组为一个函数 [fn1,fn2] => fn2(fn1())
  return funcs.reduce((left, right) => (...args) => right(left(...args)));
}

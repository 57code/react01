import React, { useState, useEffect, useReducer, useContext } from "react";

function FruitList({ fruits, setFruit }) {
  return fruits.map(f => (
    <li key={f} onClick={() => setFruit(f)}>
      {f}
    </li>
  ));
}

function FruitAdd(props) {
  const [pname, setPname] = useState("");
  const { dispatch } = useContext(Context);

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
}

// 将状态移至全局
function fruitReducer(state, action) {
  switch (action.type) {
    case "init":
      return { ...state, list: action.payload };
    case "add":
      return { ...state, list: [...state.list, action.payload] };
    case "loading_start":
      return { ...state, loading: true };
    case "loading_end":
      return { ...state, loading: false };
    default:
      return state;
  }
}

// 判断对象是否是Promise
function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

// mock一个异步方法
async function asyncFetch(p) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(p);
    }, 1000);
  });
}

// 对dispatch函数进行封装，使其支持处理异步action
function wrapDispatch(dispatch) {
  return function(action) {
    if (isPromise(action.payload)) {
      dispatch({ type: "loading_start" });
      action.payload.then(v => {
        dispatch({ type: action.type, payload: v });
        dispatch({ type: "loading_end" });
      });
    } else {
      dispatch(action);
    }
  };
}

const Context = React.createContext();

export default function HookTest() {
  // useState参数是状态初始值
  // 返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
  const [fruit, setFruit] = useState("草莓");
  //   const [fruits, setFruits] = useState([]);
  // 参数一是相关reducer，参数二是初始值
  // const [fruits, dispatch] = useReducer(fruitReducer, []);
  const [{ list: fruits, loading }, originDispatch] = useReducer(fruitReducer, {
    list: [],
    loading: false
  });
  // 包装dispatch
  const dispatch = wrapDispatch(originDispatch);

  // 使用useEffect操作副作用
  //   请务必设置依赖选项，如果没有则设置空数组表示仅执行一次
  useEffect(() => {
    console.log("get fruits");
    dispatch({ type: "init", payload: asyncFetch(["草莓", "香蕉"]) });
    // setTimeout(() => {
    //   //   setFruits(["草莓", "香蕉"]);
    //   dispatch({ type: "init", payload: ["草莓", "香蕉"] });
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
    <Context.Provider value={{ fruits, dispatch }}>
      <div>
        <p>{fruit === "" ? "请选择喜爱的水果" : `您选择的是${fruit}`}</p>
        <FruitAdd />
        {/*加载状态处理*/}
        {loading ? (
          <div>数据加载中...</div>
        ) : (
          <FruitList fruits={fruits} setFruit={setFruit} />
        )}
      </div>
    </Context.Provider>
  );
}

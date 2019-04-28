import React, { useState, useEffect, useContext } from "react";
import { Context } from "./App";

export default function GoodList() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setGoods([
        { id: 1, text: "WEB全栈架构师", price: 8999 },
        { id: 2, text: "JAVA分布式架构师", price: 8999 },
        { id: 3, text: "JS高级工程师", price: 8999 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const {
    cart: { dispatch }
  } = useContext(Context);

  return (
    <div>
      <h1>商品列表</h1>
      {loading && <p>加载中...</p>}

      <ul>
        {goods.map(good => (
          <li key={good.id}>
            {good.text} - ￥{good.price}
            <button onClick={() => dispatch({ type: "addCart", good })}>
              添加购物车
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

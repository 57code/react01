import React, { useState } from "react";

function FruitList(props) {
  return (
    <ul>
      {props.fruits.map(f => (
        <li key={f} onClick={() => props.setFruit(f)}>
          {f}
        </li>
      ))}
    </ul>
  );
}

export default function HooksTest() {
  // useState(initialState)，接收初始状态，返回一个由状态和其更新函数组成的数组
  const [fruit, setFruit] = useState("");
  const [fruits, setFruits] = useState(["香蕉", "西瓜"]);
  return (
    <div>
      <p>{fruit === "" ? "请选择喜爱的水果：" : `您的选择是：${fruit}`}</p>
      <FruitList fruits={fruits} setFruit={setFruit}/>
    </div>
  );
}

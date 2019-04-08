import React, { useState, useEffect } from "react";

function useAge() {
  const [age, setAge] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setAge(20);
    }, 2000);
  });
  return age;
}

export default function HooksTest() {
  // useState(initialState)，接收初始状态，返回一个状态变量和其更新函数
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `您点击了 ${count} 次`;
  }, [count]);

  const age = useAge();

  const [fruit, setFruit] = useState("banana");
  const [input, setInput] = useState("");
  const [fruits, setFruits] = useState(["apple", "banana"]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>

      <p>年龄 {age ? age : 'loading...'}</p>
      <p>水果 {fruit}</p>
      <p>
        <input
          type="text"
          value={input}
          onKeyDown={e => console.log(e.key)}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={() => setFruits([...fruits, input])}>添加</button>
      </p>
      <ul>
        {fruits.map(f => (
          <li key={f} onClick={() => setFruit(f)}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

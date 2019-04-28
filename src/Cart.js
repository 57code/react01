import React from "react";
import { useContext } from "react";
import { Context } from "./App";

export default function Cart() {
  const {
    cart: { state: cart }
  } = useContext(Context);
  return (
    <div>
      <h1>购物车</h1>
      <table>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.text}</td>
              <td>{item.price}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useContext } from "react";
import { Context } from "./App";
import { Redirect } from "react-router-dom";

function login() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

export default function Login({ location }) {
  const {
    user: { state, dispatch }
  } = useContext(Context);
  const { isLogin, loading } = state;
  if (isLogin) {
    console.log(location.search);
    const path = new URLSearchParams(location.search).get('redirect') || '/';
    console.log(path);
    return <Redirect to={path} />;
  }
  return (
    <div>
      <h1>用户登录</h1>
      <button
        disabled={loading}
        onClick={() => dispatch({ type: "login", payload: login() })}
      >
        {loading ? "登录中.." : "登录"}
      </button>
    </div>
  );
}

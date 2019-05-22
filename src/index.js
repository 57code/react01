import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// React.createElement() -> vdom
ReactDOM.render(<App />, document.getElementById('root'));
// let count = 1;
// render()
// setInterval(render, 1000);
// function render() {
//   ReactDOM.render(<h1>React Study, {count++}</h1>, document.getElementById("root"));
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

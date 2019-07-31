import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from './store';
import {Provider} from 'react-redux'
// console.log(jsx);

ReactDOM.render(<Provider store={store}><App title="开课吧真不错" /></Provider>, document.getElementById("root"));

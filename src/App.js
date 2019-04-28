import React, { useReducer } from "react";
import "./App.css";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import GoodList from "./GoodList";
import Cart from "./Cart";
import AddGood from "./AddGood";
import Login from "./Login";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";

function cartReducer(state, action) {
  switch (action.type) {
    case "addCart":
      const idx = state.findIndex(item => item.id === action.good.id);
      if (idx >= 0) {
        state[idx].count += 1;
      } else {
        state.push({ ...action.good, count: 1 });
      }
      return [...state];
    default:
      return state;
  }
}

function userReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { isLogin: false, loading: true };
    case "login":
      return { isLogin: true, loading: false };
    case "error":
      return { isLogin: false, loading: false };
    default:
      return state;
  }
}

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

function wrapDispatch(dispatch) {
  return function(action) {
    if (isPromise(action.payload)) {
      dispatch({ type: "loading" });
      action.payload
        .then(v => {
          dispatch({ type: action.type, payload: v });
        })
        .catch(err => {
          dispatch({ type: "error", payload: err });
        });
    } else {
      dispatch(action);
    }
  };
}

export const Context = React.createContext();

export default function App() {
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const [user, dispatchUser] = useReducer(userReducer, {
    isLogin: false,
    loading: false
  });
  const count = cart.length;
  const value = {
    cart: { state: cart, dispatch: dispatchCart },
    user: { state: user, dispatch: wrapDispatch(dispatchUser) }
  };
  return (
    <BrowserRouter>
      <Context.Provider value={value}>
        <div>
          <nav className="app-nav">
            <NavLink to="/" activeClassName="active" exact>
              商品
            </NavLink>
            <NavLink to="/cart" activeClassName="active">
              购物车<span className="badge">{count}</span>
            </NavLink>
            <NavLink to="/add" activeClassName="active">
              新增商品
            </NavLink>
          </nav>
          <Switch>
            <Route path="/" exact component={GoodList} />
            <Route path="/cart" component={Cart} />
            <PrivateRoute path="/add" component={AddGood} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Context.Provider>
    </BrowserRouter>
  );
}

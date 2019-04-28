import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "./App";

export default function PrivateRoute({ component: Comp, ...rest }) {
  const {
    user: { state }
  } = useContext(Context);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        state.isLogin ? (
          <Comp />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              search: `?redirect=${location.pathname}`
            }}
          />
        )
      }
    />
  );
}

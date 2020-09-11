import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

//only logged user should be able to see so we are restriciting few paths using following function
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

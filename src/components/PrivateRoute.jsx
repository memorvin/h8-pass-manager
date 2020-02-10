import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ component: Component, ...props }) => {
  const {currentUser} = useContext(AuthContext);
  const location = useLocation()

  return (
    <Route
      {...props}
      render={(props) =>
        !!currentUser
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/',
            state: { referrer: location.pathname }
          }}
        />}
    />
  );
};


export default PrivateRoute
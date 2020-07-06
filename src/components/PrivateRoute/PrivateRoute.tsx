import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const { user } = useUser();

  return (
    <Route
      {...props}
      render={({ location }) =>
        !!user ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;

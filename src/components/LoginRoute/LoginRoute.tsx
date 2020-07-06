import React from "react";
import { useUser } from "../../contexts/UserContext";
import { Route, Redirect, RouteProps } from "react-router-dom";

const LoginRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const { user } = useUser();
  return (
    <Route
      {...props}
      render={() => (!user ? children : <Redirect to={{ pathname: "/" }} />)}
    />
  );
};

export default LoginRoute;

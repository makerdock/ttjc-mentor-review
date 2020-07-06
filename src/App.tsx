import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

// pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

// components
import { GlobalStyle } from "./utils/globalStyles";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import LoginRoute from "./components/LoginRoute";

import { ContextProvider } from "./contexts";

const Router = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <>
          <Navbar />
          <Switch>
            <LoginRoute path="/login">
              <LoginPage />
            </LoginRoute>
            <PrivateRoute path="/">
              <HomePage />
            </PrivateRoute>
          </Switch>
        </>
      </BrowserRouter>
      <GlobalStyle />
    </ContextProvider>
  );
};

export default Router;

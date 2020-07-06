import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

// components
import { GlobalStyle } from "./utils/globalStyles";
import Navbar from "./components/Navbar";
import { ContextProvider } from "./contexts";

import "./tailwind.output.css";

const Router = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/users">
              <UserPage />
            </Route>
          </Switch>
        </>
      </BrowserRouter>
      <GlobalStyle />
    </ContextProvider>
  );
};

export default Router;

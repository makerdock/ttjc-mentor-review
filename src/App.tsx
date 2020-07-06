import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";

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
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </>
      </BrowserRouter>
      <GlobalStyle />
    </ContextProvider>
  );
};

export default Router;

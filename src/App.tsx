import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";

// components
import { GlobalStyle } from "./utils/globalStyles";
import Navbar from "./components/Navbar";
import { ContextProvider } from "./contexts";

import "./tailwind.output.css";
import DevListPage from "./pages/DevListPage";

const Router = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <>
          <Navbar />
          <Switch>
            <Route path="/developers">
              <DevListPage />
            </Route>
            <Route path="/projects">
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

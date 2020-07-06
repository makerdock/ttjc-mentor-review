import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import DevListPage from "./pages/DevListPage";

// components
import Navbar from "./components/Navbar";
import { ContextProvider } from "./contexts";

import "./tailwind.output.css";
import "./app.css";

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
    </ContextProvider>
  );
};

export default Router;

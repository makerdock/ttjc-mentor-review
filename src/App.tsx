import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
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
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/users">
              <UserPage />
            </Route>
            <Route path="/developers">
              <HomePage />
            </Route>
            <Route path="/projects">
              <DevListPage />
            </Route>
          </Switch>
        </>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default Router;

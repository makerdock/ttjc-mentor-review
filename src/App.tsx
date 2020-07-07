import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import DevListPage from "./pages/DevListPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

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
            <Route path="/developers">
              <DevListPage />
            </Route>
            <Route path="/projects">
              <ProjectPage />
            </Route>
            <Route path="/project/:id">
              <ProjectDetailPage />
            </Route>
          </Switch>
        </>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default Router;

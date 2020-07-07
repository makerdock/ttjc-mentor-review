import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// pages
import DevListPage from "./pages/DevListPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

// components
import Navbar from "./components/Navbar";
import { ContextProvider } from "./contexts";

import "./tailwind.output.css";
import "./app.css";
import DevDetailsPage from "./pages/DevDetailsPage";

const Router = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <>
          <Navbar />
          <Switch>
            <Route path="/dev/:username">
              <DevDetailsPage />
            </Route>
            <Route exact path="/">
              <DevListPage />
            </Route>
            <Route path="/projects">
              <ProjectPage />
            </Route>
            <Route path="/project/:id">
              <ProjectDetailPage />
            </Route>

            <Redirect to="/" />
          </Switch>
        </>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default Router;

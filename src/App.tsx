import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// pages
import DevListPage from "./pages/DevListPage";
import DevDetailsPage from "./pages/DevDetailsPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactPage from "./pages/ContactPage";

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
            <Route path="/dev/:username">
              <DevDetailsPage />
            </Route>
            <Route exact path="/">
              <DevListPage />
            </Route>
            <Route path="/submissions">
              <ProjectPage />
            </Route>
            <Route path="/submission/:issueId">
              <ProjectDetailPage />
            </Route>
            <Route path="/contact">
              <ContactPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default Router;

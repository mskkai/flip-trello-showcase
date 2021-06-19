import React from "react";
import HomePage from "../components/common/Home";
import NotFoundPage from "../components/common/NotFoundPage";
import PublicRoute from "./PublicRoute";
import { createBrowserHistory } from "history";
import { Route, Switch, Router } from "react-router-dom";
import LoginPage from "../components/common/LoginPage";
import PrivateRoute from "./PrivateRoute";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/home" component={HomePage} exact={true} />

        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

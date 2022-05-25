import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Index } from "../../pages/administration/Index";
import { PATH_PAGE } from "./paths";

export const AdministrationRoutes: React.FC = () => {

  return (
    <>
      <Switch>
        <Route
          path={PATH_PAGE.administration.index}
          component={Index}
          exact={true}
        />
        <Route
          path={PATH_PAGE.administration.buys}
        />
        <Route
          path={PATH_PAGE.administration.sales}
        />
        <Route
          path={PATH_PAGE.administration.taxation}
        />
        <Redirect to={PATH_PAGE.home.default} />
      </Switch>
    </>
  );
};

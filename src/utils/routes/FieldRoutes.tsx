import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Index } from "../../pages/field/Index";
import { PATH_PAGE } from "./paths";

export const FieldRoutes: React.FC = () => {
  return (
    <>
      <Switch>
        <Route
          path={PATH_PAGE.field.index}
          component={Index}
          exact={true}
        />
        <Route
          path={PATH_PAGE.field.field}
          component={Index}
          exact={true}
        />
        <Route path={PATH_PAGE.field.farming} />
        <Route path={PATH_PAGE.field.harvest} />
        <Route path={PATH_PAGE.field.cattleRaising} />
        <Redirect to={PATH_PAGE.home.default} />
      </Switch>
    </>
  );
};

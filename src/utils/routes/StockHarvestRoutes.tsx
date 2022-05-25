import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IndexPage } from "../../pages/stockHarvest/index/IndexPage";
import { PATH_PAGE } from "./paths";

export const StockHarvestRoutes: React.FC = () => {

  return (
    <>
      <Switch>
        <Route
          path={PATH_PAGE.stockHarvest.index}
          component={IndexPage}
          exact={true}
        />
        <Redirect to={PATH_PAGE.home.default} />
      </Switch>
    </>
  );
};

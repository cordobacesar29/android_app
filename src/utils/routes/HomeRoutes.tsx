import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { PATH_PAGE } from "./paths";
import HomePage from "../../pages/home/home/HomePage";
import { TareaLoteRoutes } from "./TareaLoteRoutes";
import { OrdenDeTrabajoRoutes } from "./OrdenDeTrabajoRoutes";
import { FieldRoutes } from "./FieldRoutes";
import { AdministrationRoutes } from "./AdministrationRoutes";
import { StockHarvestRoutes } from "./StockHarvestRoutes";

export const HomeRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={PATH_PAGE.home.default} exact={true}>
        <HomePage />
      </Route>
      <Route path={PATH_PAGE.tareaPorLote.home}>
        <TareaLoteRoutes />
      </Route>
      <Route path={PATH_PAGE.ordenDeTrabajo.home}>
        <OrdenDeTrabajoRoutes />
      </Route>
      <Route path={PATH_PAGE.field.index}>
        <FieldRoutes />
      </Route>
      <Route path={PATH_PAGE.administration.index}>
        <AdministrationRoutes />
      </Route>
      <Route path={PATH_PAGE.stockHarvest.index}>
        <StockHarvestRoutes />
      </Route>
      <Redirect to={PATH_PAGE.home.default} />
    </Switch>
  );
};

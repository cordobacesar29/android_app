import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Menu from "../../components/Menu";
import { useAuth } from "../hooks";
import {
  PATH_PAGE,
  AuthRoutes,
  HomeRoutes,
  PrivateRoute,
  PublicRoute,
} from "./";

export const AppRouter: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <IonSplitPane contentId="main">
        {user.logged && <Menu />}
        <IonRouterOutlet id="main">
          <>
            <PublicRoute
              path={PATH_PAGE.auth.empty}
              user={user}
              component={AuthRoutes}
            />
            <PrivateRoute
              path={PATH_PAGE.home.empty}
              user={user}
              component={HomeRoutes}
            />
          </>
        </IonRouterOutlet>
      </IonSplitPane>
    </Router>
  );
};

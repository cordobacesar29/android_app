import { Redirect, Route, Switch } from "react-router-dom";
import { LoginPage } from "../../pages/login/LoginPage";
import { PATH_PAGE } from "./paths";

export const AuthRoutes = () => {
  return (
    <Switch>
      <Route
        path={PATH_PAGE.auth.login}
        exact={true}
        render={(props) => <LoginPage {...props} />}
      />
      <Route path="/" exact={true}>
        <Redirect to={PATH_PAGE.auth.login} />
      </Route>      
    </Switch>
  );
};

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { PATH_PAGE } from "./paths";

export const PrivateRoute: React.FC<any> = ({
  user,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props: any) => {
        return user.logged ? (
          <Component {...props} />
        ) : (
          <Redirect to={PATH_PAGE.auth.login} />
        );
      }}
    />
  );
};

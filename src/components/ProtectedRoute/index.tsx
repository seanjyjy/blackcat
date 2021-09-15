import React from "react";
import { Redirect, Route } from "react-router";
import { RouteComponentProps, useLocation } from "react-router-dom";
import { Location } from "history";

interface ProtectedRouteProps {
  auth: boolean;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
    | undefined;
  path: string;
  [rest: string]: any;
}

const ProtectedRoute = ({
  auth,
  component,
  path,
  ...rest
}: ProtectedRouteProps) => {
  const location = useLocation<Location>();
  const redirect = () => (
    <Redirect
      to={{
        pathname: "/login",
        state: { queryParams: location.search },
      }}
    />
  );
  return (
    <Route {...rest} path={path} component={auth ? component : redirect} />
  );
};

export default ProtectedRoute;

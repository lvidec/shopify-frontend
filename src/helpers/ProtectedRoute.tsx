import { Redirect, Route, RouteProps } from "react-router";
import { ROUTES } from "../App";
import { isAdmin, isAuthenticated } from "../service/AuthService";

export type ProtectedRouteProps = {
  shouldBeAdmin: boolean;
} & RouteProps;

const ProtectedRoute = ({ shouldBeAdmin, ...routeProps }: ProtectedRouteProps) => {
  if (isAdmin()) {
    return <Route {...routeProps} />;
  } else if (isAuthenticated() && shouldBeAdmin === false) {
    return <Route {...routeProps} />;
  } 
  else {
    return (
      <Redirect
        to={{ pathname: ROUTES.LOGIN, state: { siteToRedirectTo: routeProps.location?.pathname } }}
      />
    );
  }
};

export default ProtectedRoute;

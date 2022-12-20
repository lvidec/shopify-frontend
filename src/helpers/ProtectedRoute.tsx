import { Redirect, Route, RouteProps } from "react-router";
import { isAuthenticated } from "../service/AuthService";
import { getUser } from "../service/StorageService";

export type ProtectedRouteProps = {
  shouldBeAdmin: boolean;
} & RouteProps;

const ProtectedRoute = ({ shouldBeAdmin, ...routeProps }: ProtectedRouteProps) => {
  if (JSON.parse(getUser()).auth === "ADMIN") {
    return <Route {...routeProps} />;
  } else if (isAuthenticated() && shouldBeAdmin === false) {
    return <Route {...routeProps} />;
  }
  else {
    return <Redirect to={{ pathname: "/login", state: { siteToRedirectTo: routeProps.location?.pathname } }} />;
  }
};

export default ProtectedRoute;

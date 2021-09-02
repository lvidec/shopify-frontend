import { Redirect, Route, RouteProps } from 'react-router';
import { getUser } from './StorageService';

export type ProtectedRouteProps = {
  component: any;
} & RouteProps;

console.log(JSON.parse(getUser()).auth);

const ProtectedRoute = ({component, ...routeProps}: ProtectedRouteProps) => {
  if(JSON.parse(getUser()).auth === "ADMIN") {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to='/login' />;
  }
};



export default ProtectedRoute;

import { Redirect, Route, RouteProps } from 'react-router';
import { isAuthenticated } from '../service/AuthService';
import { getUser } from '../service/StorageService';


export type ProtectedRouteProps = {
  shouldBeAdmin: boolean;
} & RouteProps;

// interface ProtectedRouteProps extends RouteProps {
//   shouldBeAdmin: boolean;
// };

const ProtectedRoute = ({shouldBeAdmin, ...routeProps}: ProtectedRouteProps) => {
// const ProtectedRoute: React.FC<ProtectedRouteProps>= ({shouldBeAdmin, ...routeProps}) => {
  if(JSON.parse(getUser()).auth === 'ADMIN') {
    return <Route {...routeProps} />;
  } 
  else if(isAuthenticated() && shouldBeAdmin === false ){
    return <Route {...routeProps} />;
  }
  else {
    return <Redirect to='/login' />;
  }
};



export default ProtectedRoute;

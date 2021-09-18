import React from "react";
import { Route, RouteProps } from "react-router-dom";

interface ContextRouteProps extends RouteProps {
  contextComponent: any;
  // | React.ComponentType<RouteComponentProps<any>>
  // | React.ComponentType<any>;
  component: any;
  // | React.ComponentType<RouteComponentProps<any>>
  // | React.ComponentType<any>;
}

const ContextRoute: React.FC<ContextRouteProps> = ({
  contextComponent,
  component,
  ...routeProps
}) => {
  const { Provider } = contextComponent;
  const Component = component;

  return (
    <Route {...routeProps}>
      <Provider>
        <Component />
      </Provider>
    </Route>
  );
};

export default ContextRoute;

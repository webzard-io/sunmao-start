import React, { Suspense } from 'react';
import {
  unstable_HistoryRouter as HistoryRouter,
  HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routes, { type RouteConfig } from '../routes';

export const history = createBrowserHistory();

type Options = {
  generateComponent: (route: RouteConfig) => React.FC;
  type: 'history' | 'hash';
};

export function RouteComponent(props: Options) {
  const Router = props.type === 'history' ? HistoryRouter : HashRouter;

  return (
    <Suspense fallback="loading...">
      <Router history={history}>
        <Routes>
          {routes.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  'redirect' in route ? (
                    <Navigate to={route.redirect} replace />
                  ) : (
                    (() => {
                      const Component = props.generateComponent(route);

                      return <Component />;
                    })()
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default routes;

import { Flex } from '@radix-ui/themes';
import React, { Suspense } from 'react';
import { LoaderIcon } from 'react-hot-toast';
import { createBrowserRouter } from 'react-router-dom';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const IssuePage = React.lazy(() => import('./pages/IssuePage'));
const StatsPage = React.lazy(() => import('./pages/StatsPage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const withSuspense = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense
    fallback={
      <Flex width="100%" justify="center" align="center" className="page-loader">
        <LoaderIcon />
      </Flex>
    }
  >
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    index: true,
    element: withSuspense(HomePage),
  },
  {
    path: '/:repo/:user/:id',
    element: withSuspense(IssuePage),
  },
  {
    path: '/stats',
    element: withSuspense(StatsPage),
  },
  {
    path: '/*',
    element: withSuspense(NotFound),
  },
]);

export default router;

import { useKeycloak } from '@react-keycloak/web';
import {
  QueryClient,
  QueryClientProvider,
  queryOptions,
} from '@tanstack/react-query';
import {
  RouterProvider,
  createRootRouteWithContext,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { Layout } from './components/Layout';
import { Topics } from './components/Topics';
import { topicsQueryOptions } from './queryOptions';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: Layout,
});

const topicsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(queryOptions(topicsQueryOptions)),
  component: Topics,
});

const routeTree = rootRoute.addChildren([topicsRoute.addChildren([])]);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
  },
});

export default function App() {
  const { initialized, keycloak } = useKeycloak();

  if (!initialized) return <div>Loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

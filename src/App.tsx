import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ComponentType,
  createElement,
  LazyExoticComponent,
  Suspense,
  useEffect,
  useState,
} from "react";
import routes from "./navigation/routes";
import LoadingSpinner from "./components/ui/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import type { AppRoute } from "./types";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const RouteComponent = ({ route }: { route: AppRoute }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      if (route.translations) {
        await Promise.all(route.translations.map((t) => t()));
      }
      setReady(true);
    };

    loadTranslations();
  }, [route.translations]);

  if (!ready) return <LoadingSpinner />;

  if (route.renderer.type === "element") {
    return route.renderer.component as React.ReactElement;
  }

  const Lazy = route.renderer.component as React.LazyExoticComponent<
    React.ComponentType<any>
  >;
  return <Lazy />;
};

const renderNestedRoutes = (routeList: AppRoute[]) => {
  return routeList.map((route) => {
    const { name, path, renderer, permissions, children } = route;

    const element =
      renderer.type === "element"
        ? (renderer.component as React.ReactElement)
        : createElement(
            Suspense,
            { fallback: <LoadingSpinner /> },
            createElement(
              renderer.component as LazyExoticComponent<ComponentType<any>>
            )
          );

    const wrappedElement = permissions?.length ? (
      <ProtectedRoute permissions={permissions}>{element}</ProtectedRoute>
    ) : (
      element
    );

    return (
      <Route key={name} path={path} element={wrappedElement}>
        {children ? renderNestedRoutes(children) : null}
      </Route>
    );
  });
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes
              .filter((r) => !r.permissions?.length)
              .map((route) => (
                <Route
                  key={route.name}
                  path={route.path}
                  element={<RouteComponent route={route} />}
                />
              ))}
            <Route element={<Layout />}>
              {routes
                .filter((r) => r.permissions?.length)
                .map((route) => {
                  const element = (
                    <ProtectedRoute
                      permissions={route.permissions!}
                      fallbackPath="/403"
                    >
                      <RouteComponent route={route} />
                    </ProtectedRoute>
                  );

                  return (
                    <Route key={route.name} path={route.path} element={element}>
                      {route.children
                        ? renderNestedRoutes(route.children)
                        : null}
                    </Route>
                  );
                })}
            </Route>
            <Route path="*" element={<Navigate to="/403" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

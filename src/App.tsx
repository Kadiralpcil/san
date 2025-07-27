import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, useEffect, useState } from 'react'
import routes from './navigation/routes'
import LoadingSpinner from './components/ui/Spinner'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const RouteComponent = ({ route }: { route: (typeof routes)[number] }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const loadTranslations = async () => {
      if (route.translations) {
        await Promise.all(route.translations.map((t) => t()))
      }
      setReady(true)
    }

    loadTranslations()
  }, [route.translations])

  if (!ready) return <LoadingSpinner />

  if (route.renderer.type === 'element') {
    return route.renderer.component as React.ReactElement
  }

  const Lazy = route.renderer.component as React.LazyExoticComponent<React.ComponentType<any>>
  return <Lazy />
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes (no permissions required) */}
            {routes
              .filter((r) => !r.permissions?.length)
              .map((route) => (
                <Route
                  key={route.name}
                  path={route.path}
                  element={<RouteComponent route={route} />}
                />
              ))}

            {/* Protected routes with Layout */}
            <Route element={<Layout />}>
              {routes
                .filter((r) => r.permissions?.length)
                .map((route) => (
                  <Route
                    key={route.name}
                    path={route.path}
                    element={
                      <ProtectedRoute
                        permissions={route.permissions!}
                        fallbackPath="/403"
                      >
                        <RouteComponent route={route} />
                      </ProtectedRoute>
                    }
                  />
                ))}
            </Route>

            {/* 404 fallback */}
            <Route path="*" element={<Navigate to="/403" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

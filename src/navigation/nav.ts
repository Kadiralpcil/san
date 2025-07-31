import type { AppRoute, GeneratedRouteNames, Nav, NavItem, RouteParams } from "../types";
import { replacePath } from "../utils/pathUtils";
import { findRouteByName } from "../utils/routeUtils";

const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
// Routes'tan route name'leri çıkarma fonksiyonu
const extractRouteNames = (routes: AppRoute[])=>{
  const names: string[] = [];

  function collectNames(routeList: AppRoute[]) {
    routeList.forEach((route) => {
      if (route.name) {
        names.push(toCamelCase(route.name));
      }
      if (route.children) {
        collectNames(route.children);
      }
    });
  }

  collectNames(routes);
  return names;
}

// Navigation fonksiyonu için global değişken - sadece navigate
let _navigate: ((path: string) => void) | null = null;

// Navigation fonksiyonunu set etme
export function setNavigate(navigate: (path: string) => void) {
  _navigate = navigate;
}

// Cache
let _nav: Nav | null = null;
let _routeNames: string[] = [];

// Nav objesi oluşturma
 const generateNav = async (): Promise<Nav> =>{
  try {
    const routesModule = await import("./routes");
    const routes = routesModule.default || [];

    const nav = {} as Nav;
    _routeNames = extractRouteNames(routes);

    function processRoute(route: AppRoute) {
      if (!route?.name) return;

      const camelCaseName = toCamelCase(route.name) as GeneratedRouteNames;
      nav[camelCaseName] = {
        get: (params?: RouteParams) => {
          const routeInfo = findRouteByName(routes, route.name);
          return routeInfo ? replacePath(routeInfo.fullPath, params) : "/";
        },
        go: (params?: RouteParams) => {
          if (!_navigate) {
            return;
          }

          // Basit navigation - yetki kontrolü App.tsx'te yapılıyor
          const routeInfo = findRouteByName(routes, route.name);
          const path = routeInfo ? replacePath(routeInfo.fullPath, params) : "/";
          _navigate(path);
        }
      };

      route.children?.forEach((childRoute) => processRoute(childRoute));
    }

    routes.forEach((route: AppRoute) => processRoute(route));

    return nav;
  } catch (error) {
    return {} as Nav;
  }
}

// Fallback nav
const createFallbackNav = (): Nav =>{
  const fallback = {} as Nav;
  const routeNames: GeneratedRouteNames[] = [
    'login', 'dashboard', 'posts', 'postDetail', 
    'editPost', 'postComments', 'createPost', 'forbidden'
  ];

  routeNames.forEach((routeName) => {
    fallback[routeName] = {
      get: () => "/",
      go: () => {
      }
    };
  });

  return fallback;
}

// Nav proxy objesi - TypeScript tip desteği ile
const nav: Nav = new Proxy({} as Nav, {
  get(target, prop: string | symbol) {
    if (typeof prop !== "string") return undefined;

    // Nav henüz yüklenmemişse fallback kullan
    if (!_nav) {
      generateNav().then((generatedNav) => {
        _nav = generatedNav;
      });

      const fallback = createFallbackNav();
      return (
        fallback[prop as GeneratedRouteNames] || {
          get: () => "/",
          go: () => {
            console.warn(`Cannot navigate to unknown route: ${prop}`);
          }
        }
      );
    }

    return (
      _nav[prop as GeneratedRouteNames] || {
        get: () => "/",
        go: () => {
          console.warn(`Cannot navigate to unknown route: ${prop}`);
        }
      }
    );
  },

  ownKeys() {
    return _nav ? Object.keys(_nav) : _routeNames;
  },

  has(target, prop: string | symbol) {
    if (typeof prop !== "string") return false;
    return _nav ? prop in _nav : _routeNames.includes(prop);
  },
}) as Nav;

// Nav'i önceden yükle
generateNav().then((generatedNav) => {
  _nav = generatedNav;
});

export default nav;

export type { NavItem, Nav, GeneratedRouteNames };
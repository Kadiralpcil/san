import type { AppRoute, GeneratedRouteNames, Nav, NavItem, RouteParams } from "../types";

import { replacePath } from "../utils/pathUtils";
import { findRouteByName } from "../utils/routeUtils";

const toCamelCase = (str: string): string => {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

const extractRouteNames = (routes: AppRoute[]): string[] => {
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

let _navigate: ((path: string) => void) | null = null;
let _nav: Nav | null = null;
let _routeNames: string[] = [];

export function setNavigate(navigate: (path: string) => void) {
  _navigate = navigate;
}

const generateNav = async (): Promise<Nav> => {
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
          if (!_navigate) return;
          const routeInfo = findRouteByName(routes, route.name);
          const path = routeInfo ? replacePath(routeInfo.fullPath, params) : "/";
          _navigate(path);
        }
      };

      route.children?.forEach(processRoute);
    }

    routes.forEach(processRoute);
    return nav;
  } catch (error) {
    return {} as Nav;
  }
}

const nav: Nav = new Proxy({} as Nav, {
  get(target, prop: string | symbol) {
    if (typeof prop !== "string") return undefined;
    
    return _nav?.[prop as GeneratedRouteNames] || {
      get: () => "/",
      go: () => {}
    };
  },

  ownKeys() {
    return _nav ? Object.keys(_nav) : _routeNames;
  },

  has(target, prop: string | symbol) {
    return typeof prop === "string" && _nav ? prop in _nav : false;
  },
}) as Nav;

generateNav().then((generatedNav) => {
  _nav = generatedNav;
});

export default nav;
export type { NavItem, Nav, GeneratedRouteNames };
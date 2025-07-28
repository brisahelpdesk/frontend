import { appRoutes, type AppRoutesType } from "@/data/app-routes";
import { matchPath, useLocation } from "react-router";


export function useBreadcrumbs(): AppRoutesType[] {
  const location = useLocation();
  const pathname = location.pathname;
  
  const breadcrumbs: AppRoutesType[] = [];
  breadcrumbs.push(appRoutes[0])

  if (pathname === '/') return breadcrumbs;

  const segments = pathname.split('/').filter(Boolean);
  let accumulatedPath = '';

  for (let i = 0; i < segments.length; i++) {
    accumulatedPath += `/${segments[i]}`;
    
    let match = appRoutes.find(route => route.path === accumulatedPath);
    
    if (!match) {
      match = appRoutes.find((route) => {
        const matchResult = matchPath({ path: route.path, end: false }, accumulatedPath);
        return matchResult !== null;
      });
    }

    if (match && !breadcrumbs.find(b => b.path === match.path)) {
      breadcrumbs.push(match);
    }
  }

  return breadcrumbs;
}

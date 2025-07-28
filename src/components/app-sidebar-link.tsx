import type { ReactNode } from "react";
import { InternalLink } from "./internal-link";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router";

export interface AppSidebarLinkProps {
  url: string;
  title: string;
  icon: ReactNode;
}

export function AppSidebarLink(props: AppSidebarLinkProps): React.ReactNode {
  const { url, title, icon } = props;
  const currentPath = useLocation().pathname;

  const isActiveWithSubpath = (path: string) => {
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const linkClass = cn(
    "flex items-center gap-3 px-3 py-3 rounded-sm transition-colors",
    isActiveWithSubpath(url)
      ? "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
  );

  return (
    <InternalLink href={url} className={linkClass}>
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{title}</span>
    </InternalLink>
  );
}

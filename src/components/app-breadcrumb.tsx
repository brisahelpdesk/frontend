import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumb";
import { Link } from "react-router";

export function AppBreadcrumb(): React.ReactNode {
  const breadcrumb = useBreadcrumbs();
  
  if(breadcrumb.length === 1) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center mb-6">
        {breadcrumb.map(({ name, path, icon: Icon }, index) => {
          const isLast = index === breadcrumb.length - 1;

          return (
            <BreadcrumbItem key={path}>
              {isLast ? (
                <BreadcrumbPage className="flex items-center text-slate-900 font-medium">
                  <Icon className="w-4 h-4 mr-2" />
                  {name}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    to={path}
                    className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {name}
                  </Link>
                </BreadcrumbLink>
              )}
              {!isLast && <BreadcrumbSeparator className="text-slate-400 " />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

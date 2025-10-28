import { Suspense, lazy } from "react";
import { MainLayout } from "./layouts/main-layout";
import { AuthLayout } from "./layouts/auth-layout";
import { ClientPortalLayout } from "./layouts/client-portal-layout";
import { createBrowserRouter, RouterProvider } from "react-router";
import { RouterLoadingFallback } from "./components/router-loading-fallback";
import { ProtectedEmployeeRoute } from "./features/auth/components/protected-employee-route";
import { ProtectedClientRoute } from "./features/auth/components/protected-client-route";
import { RootRedirect } from "./features/auth/components/root-redirect";

const DashboardPage = lazy(() => import("./features/dashboard/dashboard.page").then(m => ({ default: m.DashboardPage })));
const TicketsPage = lazy(() => import("./features/tickets/pages/tickets.page").then(m => ({ default: m.TicketsPage })));
const SLAsPage = lazy(() => import("./features/slas/pages/slas.page.tsx").then(m => ({ default: m.SLAsPage })));
const SLADetailsPage = lazy(() => import("./features/slas/pages/sla-details.page.tsx").then(m => ({ default: m.SLADetailsPage })));
const ReportsPage = lazy(() => import("./features/reports/reports.page").then(m => ({ default: m.ReportsPage })));
const SettingsPage = lazy(() => import("./features/settings/settings.page").then(m => ({ default: m.SettingsPage })));
const TicketDetailsPage = lazy(() => import("./features/tickets/pages/ticket-details.page").then(m => ({ default: m.TicketDetailsPage })));
const LoginPage = lazy(() => import("./features/auth/pages/auth-login.page").then(m => ({ default: m.LoginPage })));
const ActiveUserPage = lazy(() => import("./features/auth/pages/auth-active-user.page").then(m => ({ default: m.ActiveUserPage })));
const EmployeePage = lazy(() => import("./features/employee/pages/employees.page").then(m => ({ default: m.EmployeePage })));
const EmployeeDetailsPage = lazy(() => import("./features/employee/pages/employee-details.page").then(m => ({ default: m.EmployeeDetailsPage })));
const ClientPortalPage = lazy(() => import("./features/client-portal/pages/client-portal.page").then(m => ({ default: m.ClientPortalPage })));
const ProductsPage = lazy(() => import("./features/products/pages/products.page").then(m => ({ default: m.ProductsPage })));
const ProductDetailsPage = lazy(() => import("./features/products/pages/product-details.page").then(m => ({ default: m.ProductDetailsPage })));
const ClientPortalMyTicket = lazy(() => import("./features/client-portal/pages/client-portal-my-tickets.page").then(m => ({ default: m.ClientPortalMyTicket })));
const ClientPage = lazy(() => import("./features/client/pages/clients.page").then(m => ({ default: m.ClientPage })));
const ClientDetailsPage = lazy(() => import("./features/client/pages/client-details.page").then(m => ({ default: m.ClientDetailsPage })));

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        Component: RootRedirect, // Redireciona baseado no tipo de usuário
      },
      {
        path: "app",
        element: (
          <ProtectedEmployeeRoute>
            <MainLayout />
          </ProtectedEmployeeRoute>
        ),
        children: [
          {
            index: true,
            Component: DashboardPage,
          },
          {
            path: "tickets",
            children: [
              {
                index: true,
                Component: TicketsPage,
              },
              {
                path: ":ticketId",
                Component: TicketDetailsPage,
              },
            ],
          },
          {
            path: "employees",
            children: [
              {
                index: true,
                Component: EmployeePage,
              },
              {
                path: ":employeeId",
                Component: EmployeeDetailsPage,
              },
            ],
          },
          {
            path: "clients",
            children: [
              {
                index: true,
                Component: ClientPage,
              },
              {
                path: ":clientId",
                Component: ClientDetailsPage,
              },
            ],
          },
          {
            path: "slas",
            children: [
              {
                index: true,
                Component: SLAsPage,
              },
              {
                path: ":slaId",
                Component: SLADetailsPage,
              },
            ],
          },
          {
            path: "reports",
            children: [
              {
                index: true,
                Component: ReportsPage,
              },
            ],
          },
          {
            path: "products",
            children: [
              {
                index: true,
                Component: ProductsPage,
              },
              {
                path: ":productId",
                Component: ProductDetailsPage,
              },
            ],
          },
          {
            path: "settings",
            Component: SettingsPage,
          },
        ],
      },
      {
        path: "client-portal",
        element: (
          <ProtectedClientRoute>
            <ClientPortalLayout />
          </ProtectedClientRoute>
        ),
        children: [
          {
            index: true,
            Component: ClientPortalPage,
          },
          {
            path: "tickets/:ticketId",
            Component: ClientPortalMyTicket,
          },
        ],
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          {
            path: "login",
            Component: LoginPage,
          },
          {
            path: "active-user/:userId",
            Component: ActiveUserPage,
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return (
    <Suspense fallback={<RouterLoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

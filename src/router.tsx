import { createBrowserRouter, RouterProvider } from "react-router";
import { DashboardPage } from "./features/dashboard/dashboard.page";
import { MainLayout } from "./layouts/main-layout";
import { TicketsPage } from "./features/tickets/tickets.page";
import { SlasPage } from "./features/slas/slas.page";
import { ReportsPage } from "./features/reports/reports.page";
import { SettingsPage } from "./features/settings/settings.page";
import { TicketDetailsPage } from "./features/tickets/details/ticket-details.page";
import { ProductsPage } from "./features/products/pages/products.page";
import { ProductDetailsPage } from "./features/products/pages/product-details.page";
import { LoginPage } from "./features/auth/pages/login.page";
import { ActiveUserPage } from "./features/auth/pages/active-user.page";
import { AuthLayout } from "./layouts/auth-layout";
import NotFound from "./components/notfound";
import { fetchEmployessById } from "./features/employee/employee-services";
import { EmployeePage } from "./features/employee/page/employees-page";
import { EmployeeDetailsPage } from "./features/employee/page/employee-details-page";
import { EmployeeDetailsLoading } from "./features/employee/components/employee-details-loading";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "app",
        Component: MainLayout,
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
            path: "users",
            children: [
              {
                index: true,
                Component: EmployeePage,
              },
              {
                path: ":userId",
                loader: ({ params }) => fetchEmployessById(params.userId!),
                hydrateFallbackElement: <EmployeeDetailsLoading />,
                errorElement: (
                  <NotFound
                    title="Usuário não encontrado"
                    description="O usuário que você tentou acessar não existe, foi removido ou o identificador está incorreto."
                    linkText="Voltar para Usuários"
                    linkHref="/app/users"
                  />
                ),
                Component: EmployeeDetailsPage,
              },
            ],
          },
          {
            path: "slas",
            children: [
              {
                index: true,
                Component: SlasPage,
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
  return <RouterProvider router={router} />;
}

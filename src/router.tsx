import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardPage } from "./features/dashboard/dashboard.page";
import { MainLayout } from "./layouts/main.layout";
import { TicketsPage } from "./features/tickets/tickets.page";
import { SlasPage } from "./features/slas/slas.page";
import { ReportsPage } from "./features/reports/reports.page";
import { SettingsPage } from "./features/settings/settings.page";
import { TicketDetailsPage } from "./features/tickets/details/ticket-details.page";
import { AuthLayout } from "./layouts/auth.layout";
import { UsersPage } from "./features/users/page/users.page";
import type { ReactNode } from "react";
import { UserDetailsPage } from "./features/users/page/user-details.page";
import { ProductsPage } from "./features/products/pages/products.page";
import { ProductDetailsPage } from "./features/products/pages/product-details.page";
import { LoginPage } from "./features/auth/pages/login.page";
import { ActiveUserPage } from "./features/auth/pages/active_user.page";


export function Router(): ReactNode {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="tickets">
              <Route index element={<TicketsPage />} />
              <Route path=":ticketId" element={<TicketDetailsPage />} />
            </Route>
            <Route path="users">
              <Route index element={<UsersPage />} />
              <Route path=":userId" element={<UserDetailsPage />} />
            </Route>
            <Route path="slas" element={<SlasPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="products">
              <Route index element={<ProductsPage />} />
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="active-user/:userId" element={<ActiveUserPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

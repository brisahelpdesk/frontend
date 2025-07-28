import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardPage } from "./features/dashboard/dashboard.page";
import { MainLayout } from "./layouts/main.layout";
import { TicketsPage } from "./features/tickets/tickets.page";
import { UsersPage } from "./features/users/users.page";
import { SlasPage } from "./features/slas/slas.page";
import { ReportsPage } from "./features/reports/reports.page";
import { ProductsPage } from "./features/products/products.page";
import { SettingsPage } from "./features/settings/settings.page";
import { LoginPage } from "./features/auth/login/login.page";
import { FirstAccessPage } from "./features/auth/login/first-access/first-access.page";
import { TicketDetailsPage } from "./features/tickets/details/ticket-details.page";
import { AuthLayout } from "./layouts/auth.layout";
import type { ReactNode } from "react";

export function Router(): ReactNode {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route element={<MainLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="tickets">
                <Route index element={<TicketsPage />} />
                <Route
                  path="details/:ticketId"
                  element={<TicketDetailsPage />}
                />
              </Route>
              <Route path="users" element={<UsersPage />} />
              <Route path="slas" element={<SlasPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="auth" element={<AuthLayout />}>
              <Route path="login">
                <Route index element={<LoginPage />} />
                <Route path="first-access" element={<FirstAccessPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

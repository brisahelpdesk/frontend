import type { ReactNode } from "react";
import { Outlet } from "react-router";

export function AuthLayout(): ReactNode {
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Outlet />
    </main>
  );
}
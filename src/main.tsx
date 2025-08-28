import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { Router } from "./router";
import { QueryProvider } from "./lib/query";
import { Toaster } from "./components/ui/sonner";

const elementRoot = document.getElementById("root");

if (!elementRoot) throw new Error("Root element not found");

const root = createRoot(elementRoot);

root.render(
  <StrictMode>
    <QueryProvider>
      <Router />
      <Toaster duration={6000} position="top-center" />
    </QueryProvider>
  </StrictMode>
);

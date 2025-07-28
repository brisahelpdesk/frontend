import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export function QueryProvider(props: QueryProviderProps) {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
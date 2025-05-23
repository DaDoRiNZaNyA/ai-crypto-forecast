"use client";

import {
  QueryClient,
  QueryClientProvider as QCProvider,
} from "@tanstack/react-query";
import React from "react";

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  return <QCProvider client={queryClient}>{children}</QCProvider>;
}

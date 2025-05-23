"use client";

import { ProgressProvider } from "@bprogress/next/app";

const BProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider
      height="4px"
      options={{ showSpinner: false }}
      shallowRouting
      color="#3B82F6"
    >
      {children}
    </ProgressProvider>
  );
};

export default BProgressProvider;

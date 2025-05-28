import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex mt-20 justify-center min-h-screen bg-background">
      <div className="xl:w-1/3 md:w-1/2 w-full">{children}</div>
    </div>
  );
}

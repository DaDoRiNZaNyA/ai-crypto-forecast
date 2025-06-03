"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { useRouter } from "next/navigation";
import { routes } from "@/kernel/routes";

export default function Navbar({
  email,
  logoutAction,
}: {
  email: string | null;
  logoutAction: () => Promise<void>;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.refresh();
    router.push(routes.home());
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link
              href={routes.home()}
              className="md:text-xl text-normal font-semibold text-gray-900 dark:text-white"
            >
              AiCryptoForecast
            </Link>
          </div>

          <div className="flex items-center ml-2 md:space-x-4 space-x-2">
            <ThemeToggle />

            {email ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="overflow-hidden text-ellipsis whitespace-nowrap justify-start max-w-[150px] md:max-w-full"
                  >
                    {email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Button variant="ghost" asChild className="w-full">
                      <Link href={routes.profile()}>Profile</Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href={routes.signIn()}>Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

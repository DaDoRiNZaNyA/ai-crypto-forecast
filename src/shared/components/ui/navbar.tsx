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
// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   { href: "/blog", label: "Blog" },
//   { href: "/contact", label: "Contact" },
// ];

export default function Navbar() {
  const loading = false;
  const user = null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-semibold text-gray-900 dark:text-white"
            >
              MyApp
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            {/* {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {link.label}
              </Link>
            ))} */}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {loading ? null : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {"user.email"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link href="/profile">
                      <a>Profile</a>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/api/auth/logout">Logout</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

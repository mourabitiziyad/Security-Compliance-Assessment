"use client";
import Link from "next/link";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import SecmoLogo from "../../public/secmo-full.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import Authenticate from "./authenticate";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

export default function Header({ session }: { session: Session | null }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 bg-white px-4 shadow-sm md:px-6 md:py-10">
      <nav className="hidden w-full flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image src={SecmoLogo} height={150} width={150} alt="Secmo Logo" />
        </Link>

        {/* Drop-down menu for Project */}
        <Link
          prefetch
          href="/projects"
          className={cn(
            pathname.startsWith("/projects")
              ? "text-foreground"
              : "text-muted-foreground",
            "flex items-center gap-[0.2rem] text-lg font-medium transition-colors hover:text-foreground",
          )}
        >
          Projects
        </Link>

        <Link
          prefetch
          href="/refa"
          className={cn(
            pathname.startsWith("/refa")
              ? "text-foreground"
              : "text-muted-foreground",
            "min-w-fit text-lg font-medium transition-colors hover:text-foreground",
          )}
        >
          Reference Model
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="mr-12 flex w-44 items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Image
                src={SecmoLogo}
                height={150}
                width={150}
                alt="Secmo Logo"
              />
              <span className="sr-only">Secmo</span>
            </Link>
            <Link href="/projects" className="hover:text-foreground">
              Projects
            </Link>
            <Link
              prefetch
              href="/refa"
              className="text-muted-foreground hover:text-foreground"
            >
              Reference Model
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full justify-end">
        {!session && <Authenticate action="signIn" />}
        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="rounded-full">
              <span className="rounded-full">
                {session?.user?.image && (
                  <img
                    src={session?.user?.image}
                    alt="User profile"
                    className="h-10 w-10 rounded-full"
                  />
                )}
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Authenticate className="bg-none" action="signOut" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

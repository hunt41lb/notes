"use client";

// Marketing Components //
import { Logo } from "./logo";

// Hooks //
import { useScrollTop } from "@/hooks/use-scroll-top";

// Components //
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

import { cn } from "@/lib/utils";
import Link from "next/link";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div className={cn(
      "z-50 bg-background fixed top-0 flex items-center w-full p-6",
      scrolled && "bored-b shadow-sm"
    )}>
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && (
          <Spinner />
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="secondary" size="sm" className="text-foreground">
                Sign In
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">
                Get Notes Free
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button size="sm" asChild>
              <Link href="/documents">
                View Notes
              </Link>
            </Button>
            <UserButton
              afterSignOutUrl="/"
            />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  )
}

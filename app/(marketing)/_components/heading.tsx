"use client";

// Icons //
import { ArrowRight } from "lucide-react";

// Components //
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { SignInButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";

import Link from "next/link";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl text-foreground md:text-6xl font-bold">
        The last open source notes project.
      </h1>
      <h3 className="text-base sm:text-xl text-foreground md:text-2xl font-medium">
        Your open-source haven for crafting, organizing, and <br />
        collaborating on notes.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            View Notes
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Notes
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}

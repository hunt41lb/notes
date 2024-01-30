"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

import { Montserrat } from "@next/font/google";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" })
      .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating",
      success: "Note Created!",
      error: "Failed",
    });
  };

  return (
    <>
      <div className="bg-background h-full flex flex-col items-center justify-center space-y-4">
        <Image
          src="/logo-og.png"
          height="300"
          width="300"
          alt="thumbnail"
          className="dark:hidden"
        />
        <Image
          src="/logo-dark-og.png"
          height="300"
          width="300"
          alt="thumbnail"
          className="hidden dark:block"
        />
        <Button onClick={onCreate}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Note
        </Button>
      </div>
    </>
  );
};

export default DocumentsPage

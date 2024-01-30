"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

// Actions //
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { useMemo } from "react";
//import { Editor } from "@/components/editor";
import { Toolbar } from "@/components/toolbar";

// Icons//
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/cover";

// Authentication //
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

// Affects //
import { Skeleton } from "@/components/ui/skeleton";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({
  params
}: DocumentIdPageProps) => {
  const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }) ,[]);

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
  });

  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content
    });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return ( 
    <div className="bg-background pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto text-foreground">
        <Toolbar initialData={document} />
        <Editor
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;

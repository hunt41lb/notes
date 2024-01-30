"use client";

import { api } from "@/convex/_generated/api";

import {
  BellPlus,
  Upload,
  Diff,
  ListPlus,
  FolderPlus
} from "lucide-react";

import { 
  Item,
  ItemLarge
} from "./item";

import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropdownMenuAddPage() {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Toolbar</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuLabel>Add Page</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <Item className="mr-2 h-4 w-4"
              onClick={onCreate}
              icon={Diff}
              label={<span className="text-foreground">Comparison</span>}
            />
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Item className="mr-2 h-4 w-4"
              asChild
              onClick={onCreate}
              icon={ListPlus}
              label={<span className="text-foreground">Checklist</span>}
            /> 
          </DropdownMenuItem>
          <DropdownMenuItem disabled asChild>
            <Item className="mr-2 h-4 w-4"
              onClick={onCreate}
              icon={Upload}
              label={<span className="text-foreground">Document</span>}
            />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Item className="mr-2 h-4 w-4 pt-1 pb-1"
              onClick={onCreate}
              icon={FolderPlus}
              label={<span className="text-foreground">Note</span>}
            />
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Item
              className="mr-2 h-4 w-4 pt-1 pb-1"
              onClick={onCreate}
              icon={BellPlus}
              label={<span className="text-foreground">Reminder</span>}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

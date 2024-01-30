"use client";

import {
  BellOff,
  BellRing,
  Book,
  BookOpen,
  ChevronLeft,
  ChevronDown,
  Columns3,
  CopyPlus,
  MenuIcon,
  Minimize2,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
  List,
  ListTodo,
  ListPlus,
  FilePlus,
  FolderClosed,
  FolderOpen,
  FolderPlus,
  BellPlus,
  Trash2,
  Upload
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";

import { UserItem } from "./user-item";
import { DocumentList } from "./document-list";
import { TrashBox } from "./trash-box";
import { Navbar } from "./navbar";

import { SearchCommand } from "@/components/search-command";
import { ModeToggle } from "@/components/mode-toggle";

import { 
  Item,
  ItemLarge
} from "./item";

export const SideNavigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);
  const params = useParams();

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const router = useRouter();
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [isChecklistCollapsed, setIsChecklistCollapsed] = useState(false);
  const [isCompareCollapsed, setIsCompareCollapsed] = useState(false);
  const [isNotesCollapsed, setIsNotesCollapsed] = useState(false);
  const [isDocumentsCollapsed, setIsDocumentsCollapsed] = useState(false);
  const [isRemindersCollapsed, setIsRemindersCollapsed] = useState(false);


  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 260) newWidth = 260;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "260px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 260px)"
      );
      navbarRef.current.style.setProperty(
        "left",
        isMobile ? "100%" : "260px"
      );
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" })
      .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note."
    });
  };

  const toggleNotesCollapse = () => {
    setIsNotesCollapsed(!isNotesCollapsed);
  };

  const toggleCompareCollapse = () => {
    setIsCompareCollapsed(!isCompareCollapsed);
  };

  const toggleChecklistCollapse = () => {
    setIsChecklistCollapsed(!isChecklistCollapsed);
  };

  const toggleDocumentsCollapse = () => {
    setIsDocumentsCollapsed(!isDocumentsCollapsed);
  };

  const toggleRemindersCollapse = () => {
    setIsRemindersCollapsed(!isRemindersCollapsed);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar border-r border-border h-full overflow-y-auto relative flex w-60 flex-col z-[99999] h-screen",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div className="bg-background text-center w-200">
          <div
            onClick={collapse}
            role="button"
            className={cn(
              "h-6 w-6 rounded-sm hover:bg-secondary/80 dark:hover:bg-secondary/80 absolute top-3 right-2 group-hover/sidebar:opacity-100 transition",
              isMobile && "w-0"
            )}
          >
            <ChevronLeft className="h-6 w-6" />
          </div>
          <div>
            <UserItem />
          </div>
          <SearchCommand />
          <div className="mb-2 px-6 py-4 font-semibold tracking-tight space-y-4">
            <div className="mt-4" style={{ paddingLeft: '10px' }}>
              <div className="p-1 rounded-md hover:bg-secondary/80 dark:hover:bg-secondary/80" onClick={toggleCompareCollapse} style={{ display: 'flex', alignItems: 'center' }}>
                {isCompareCollapsed ? <Minimize2 /> : <Columns3 />}
                <p style={{ marginLeft: '10px' }}>Compare</p>
              </div>
            </div>
            <div className="mt-4" style={{ paddingLeft: '10px' }}>
              <div className="p-1 rounded-md hover:bg-secondary/80 dark:hover:bg-secondary/80" onClick={toggleChecklistCollapse} style={{ display: 'flex', alignItems: 'center' }}>
                {isChecklistCollapsed ? <Minimize2 /> : <ListTodo />}
                <p style={{ marginLeft: '10px' }}>Checklist</p>
              </div>
            </div>
            <div className="mt-4" style={{ paddingLeft: '10px' }}>
              <div className="p-1 rounded-md hover:bg-secondary/80 dark:hover:bg-secondary/80" onClick={toggleDocumentsCollapse} style={{ display: 'flex', alignItems: 'center' }}>
                {isDocumentsCollapsed ? <Minimize2 /> : <BookOpen />}
                <p style={{ marginLeft: '10px' }}>Documents</p>
              </div>
            </div>
            <div className="mt-4" style={{ paddingLeft: '10px' }}>
              <div className="p-1 rounded-md hover:bg-secondary/80 dark:hover:bg-secondary/80" onClick={toggleNotesCollapse} style={{ display: 'flex', alignItems: 'center' }}>
                {isNotesCollapsed ? <Minimize2 /> : <FolderOpen />}
                <p style={{ marginLeft: '10px' }}>Notes</p>
              </div>
              {!isNotesCollapsed && <DocumentList />}
            </div>
            <div className="mt-4" style={{ paddingLeft: '10px' }}>
              <div className="p-1 rounded-md hover:bg-secondary/80 dark:hover:bg-secondary/80" onClick={toggleRemindersCollapse} style={{ display: 'flex', alignItems: 'center' }}>
                {isRemindersCollapsed ? <Minimize2 /> : <BellRing />}
                <p style={{ marginLeft: '10px' }}>Reminders</p>
              </div>
            </div>
            <div>
              <Popover>
                <PopoverTrigger className="w-full mt-4 h-7 w-7" style={{ display: 'flex', alignItems: 'center' }}>
                  <Item
                    className="w-full mt-4 h-7 w-7 text-destructive"
                    label="Trash"
                    icon={Trash}
                  />
                </PopoverTrigger>
                <PopoverContent
                  className="p-0 w-72"
                  side={isMobile ? "bottom" : "right"}
                  >
                  <TrashBox />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/15 right-0 top-0"
        />
        <div className="flex-1">
          {/* Your main content */}
        </div>
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar
            isCollapsed={isCollapsed}
            onResetWidth={resetWidth}
          />
        ) : (
          <nav className="bg-transparent px-3 py-12 w-full">
            {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
          </nav>
        )}
      </div>
    </>
  );
};

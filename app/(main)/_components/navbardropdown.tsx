"user client";
import React from "react";

// Import Main Components //
import DropdownMenuAccount from "./dropdownmenu-account";
import DropdownMenuShare from "./dropdownmenu-share";
import DropdownMenuAddPage from "./dropdownmenu-add";

export const NavbarDropdown = () => {

  return (
    <div className="bg-background dark:bg-background flex h-11 items-center justify-between gap-x-4 bg-background px-4 shadow-extra-sm z-[99999]">
      <div className="flex items-center text-sm gap-x-4 text-foreground">
        <DropdownMenuAccount />
        <DropdownMenuAddPage />
        <DropdownMenuShare />
      </div> 
    </div>
  );
}

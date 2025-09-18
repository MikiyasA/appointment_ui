import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { modals } from "@mantine/modals";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import ClientProfileForm from "../client/ClientProfileForm";
import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
}
const ManageTableAction = ({ children }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ManageTableAction;

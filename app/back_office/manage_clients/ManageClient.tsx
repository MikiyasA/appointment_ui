"use client";
import ManageTableAction from "@/app/components/back_office/ManageTableAction";
import ClientProfileForm from "@/app/components/client/ClientProfileForm";
import { GenericDataTable } from "@/app/components/DataTable";
import { badgeFormatter } from "@/app/config/jsx_utils";
import { Client } from "@/app/config/type";
import { useApi } from "@/app/config/useApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button, Center } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";

interface Props {
  data: Client[];
}
const ManageClients = ({ data }: Props) => {
  const [updatedData, setUpdatedData] = useState(data);
  const { fetchGet } = useApi();
  const refreshData = async () => {
    setUpdatedData(await fetchGet("clients"));
  };
  const action = (item: Client) => (
    <ManageTableAction>
      <DropdownMenuItem
        onClick={() =>
          modals.open({
            title: "Update Client",
            children: (
              <ClientProfileForm
                data={item}
                action="update"
                refreshData={refreshData}
              />
            ),
          })
        }
      >
        Update Client
      </DropdownMenuItem>
    </ManageTableAction>
  );
  return (
    <Center>
      <GenericDataTable
        data={updatedData || data}
        columnHeadings={["firstName", "lastName", "email", "status"]}
        noDataText="No client registered"
        columnFormatters={{
          status: badgeFormatter,
        }}
        action={action}
        selectable
      />
    </Center>
  );
};

export default ManageClients;

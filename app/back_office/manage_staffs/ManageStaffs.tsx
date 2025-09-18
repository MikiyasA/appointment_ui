"use client";
import ManageTableAction from "@/app/components/back_office/ManageTableAction";
import { GenericDataTable } from "@/app/components/DataTable";
import { listStringFormatter } from "@/app/config/jsx_utils";
import { Staff } from "@/app/config/type";
import { useApi } from "@/app/config/useApi";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Center } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { useState } from "react";
import StaffForm from "./StaffForm";

interface Props {
  data: Staff[];
}
const ManageStaffs = ({ data }: Props) => {
  const [updatedData, setUpdatedData] = useState(data);
  const { fetchGet } = useApi();
  const refreshData = async () => {
    setUpdatedData(await fetchGet("staff"));
  };
  const action = (item: Staff) => (
    <ManageTableAction>
      <DropdownMenuItem
        onClick={() =>
          modals.open({
            title: "Update Staff",
            children: (
              <StaffForm
                data={item}
                action="update"
                refreshData={refreshData}
              />
            ),
          })
        }
      >
        Update Staff
      </DropdownMenuItem>
    </ManageTableAction>
  );
  return (
    <Center>
      <GenericDataTable
        data={updatedData || data}
        columnHeadings={[
          "idNo",
          "firstName",
          "lastName",
          "email",
          "status",
          "role",
        ]}
        noDataText="No staff registered"
        columnFormatters={{
          role: listStringFormatter,
        }}
        action={action}
      />
    </Center>
  );
};

export default ManageStaffs;

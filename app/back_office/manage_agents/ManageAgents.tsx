"use client";
import { GenericDataTable } from "@/app/components/DataTable";
import { badgeFormatter } from "@/app/config/jsx_utils";
import { Agent } from "@/app/config/type";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Box, Button, Center } from "@mantine/core";
import React, { useEffect, useState } from "react";
import AgentForm from "./AgentForm";
import ManageTableAction from "@/app/components/back_office/ManageTableAction";
import { useApi } from "@/app/config/useApi";
import { modals } from "@mantine/modals";
import { Group } from "lucide-react";
import { SecondaryColor } from "@/app/config/color";
import { usePageLeave } from "@mantine/hooks";

interface Props {
  data: Agent[];
}
const ManageAgents = ({ data }: Props) => {
  const [updatedData, setUpdatedData] = useState(data);
  const [usedPriority, setUsedPriority] = useState<(number | null)[]>();
  const [assignedStaff, setAssignedStaff] = useState<(string | null)[]>();
  const { fetchGet } = useApi();
  const refreshData = async () => {
    setUpdatedData(await fetchGet("agent/agentsWithStaffs"));
  };
  useEffect(() => {
    setUsedPriority(updatedData?.map((x) => x.priority));
    setAssignedStaff(updatedData?.map((x) => x.staffId));
  }, [updatedData]);

  const action = (item: Agent) => (
    <ManageTableAction>
      <DropdownMenuItem
        onClick={() =>
          modals.open({
            title: "Update Agent",
            children: (
              <AgentForm
                data={item}
                action="update"
                refreshData={refreshData}
                usedPriority={usedPriority}
                assignedStaff={assignedStaff}
              />
            ),
          })
        }
      >
        Update Agent
      </DropdownMenuItem>
    </ManageTableAction>
  );
  return (
    <Center mt={40} style={{ flexDirection: "column" }}>
      <Box style={{ alignSelf: "start" }}>
        <Button
          color={SecondaryColor}
          onClick={() =>
            modals.open({
              title: "Add Agent",
              children: (
                <AgentForm
                  action="add"
                  refreshData={refreshData}
                  usedPriority={usedPriority}
                  assignedStaff={assignedStaff}
                />
              ),
            })
          }
        >
          Add Agent
        </Button>
      </Box>
      <GenericDataTable
        data={updatedData || data}
        columnHeadings={[
          "idNo",
          "firstName",
          "lastName",
          "email",
          "status",
          "priority",
        ]}
        noDataText="There is No Active Agent"
        columnFormatters={{
          status: badgeFormatter,
        }}
        action={action}
      />
    </Center>
  );
};

export default ManageAgents;

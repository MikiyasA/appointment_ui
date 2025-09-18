import { GenericDataTable } from "@/app/components/DataTable";
import { badgeFormatter } from "@/app/config/jsx_utils";
import { Agent } from "@/app/config/type";
import { getData } from "@/app/config/utils";
import { Center } from "@mantine/core";
import React from "react";
import ManageAgents from "./ManageAgents";

const ManageAgentsPage = async () => {
  const data: Agent[] = await getData("agent/agentsWithStaffs");
  return (
    <Center>
      <ManageAgents data={data} />
    </Center>
  );
};

export default ManageAgentsPage;

import React from "react";
import ManageClients from "./ManageClient";
import { Center } from "@mantine/core";
import { Client } from "@/app/config/type";
import { getData } from "@/app/config/utils";

const ManageClientsPage = async () => {
  const data: Client[] = await getData("Clients");
  console.log({ data });
  return (
    <Center>
      <ManageClients data={data} />
    </Center>
  );
};

export default ManageClientsPage;

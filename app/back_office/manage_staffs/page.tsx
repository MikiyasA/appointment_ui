import React from "react";
import ManageStaffs from "./ManageStaffs";
import { Center } from "@mantine/core";
import { Staff } from "@/app/config/type";
import { getData } from "@/app/config/utils";

const ManageStaffsPage = async () => {
  const data: Staff[] = await getData("staff");
  return (
    <Center>
      <ManageStaffs data={data} />
    </Center>
  );
};

export default ManageStaffsPage;

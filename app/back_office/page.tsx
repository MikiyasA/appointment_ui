import { Box, Center, Grid, GridCol, Group, Text } from "@mantine/core";
import React from "react";
import { Dashboard } from "../config/type";
import { getData } from "../config/utils";

const BackOffice = async () => {
  const data: Dashboard = await getData("dashboard");
  return (
    <Center mt={50}>
      <Group justify="center">
        <Box style={{ textAlign: "center" }}>
          <Group gap={20}>
            <Box c={"white"} bg={"green"} bdrs={5} p={20}>
              {data.closedAppointments}
              <Text>Close Appointments</Text>
            </Box>
            <Box c={"white"} bg={"yellow"} bdrs={5} p={20}>
              {data.openAppointments}
              <Text>Open Appointments</Text>
            </Box>
          </Group>
          <Box c={"white"} bg={"teal"} bdrs={5} mt={20} p={20}>
            {data.totalAppointments}
            <Text>Total Appointments</Text>
          </Box>
        </Box>
        <Box style={{ textAlign: "center" }}>
          <Group gap={20}>
            <Box c={"white"} bg={"green"} bdrs={5} p={20}>
              {data.closedAppointments}
              <Text>Close Appointments</Text>
            </Box>
            <Box c={"white"} bg={"yellow"} bdrs={5} p={20}>
              {data.openAppointments}
              <Text>Open Appointments</Text>
            </Box>
          </Group>
          <Box c={"white"} bg={"teal"} bdrs={5} mt={20} p={20}>
            {data.totalAppointments}
            <Text>Total Appointments</Text>
          </Box>
        </Box>
      </Group>
    </Center>
  );
};

export default BackOffice;

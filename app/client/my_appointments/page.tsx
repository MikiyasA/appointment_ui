import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import AppointmentList from "@/app/components/AppointmentList";
import { SecondaryColor } from "@/app/config/color";
import { Appointment } from "@/app/config/type";
import { getData } from "@/app/config/utils";
import { Box, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { getServerSession } from "next-auth";
import React from "react";

const MyAppointmentPage = async () => {
  const session = await getServerSession(authOptions);

  const activeAppointments: Appointment[] = await getData(
    `appointment/findCurrentByClientId/${session?.userId}`,
  );
  const myAllAppointments: Appointment[] = await getData(
    `appointment/findAllByClientId/${session?.userId}`,
  );
  console.log({ myAllAppointments, session });

  return (
    <Box m={30}>
      <Tabs
        color={SecondaryColor}
        variant="pills"
        defaultValue="ActiveAppointments"
      >
        <TabsList>
          <TabsTab value="ActiveAppointments">Active Appointments</TabsTab>
          <TabsTab value="MyAllAppointments">My All Appointments</TabsTab>
        </TabsList>
        <TabsPanel value="ActiveAppointments">
          <AppointmentList data={activeAppointments} location="client" />
        </TabsPanel>
        <TabsPanel value="MyAllAppointments">
          <AppointmentList data={myAllAppointments} location="client" />
        </TabsPanel>
      </Tabs>
    </Box>
  );
};

export default MyAppointmentPage;

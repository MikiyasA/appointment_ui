import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppointmentList from "@/app/components/AppointmentList";
import { DarkerColor, SecondaryColor } from "@/app/config/color";
import { Appointment } from "@/app/config/type";
import { getData } from "@/app/config/utils";
import { Box, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import { getServerSession } from "next-auth";
import React from "react";

const AppointmentsPage = async () => {
  const session = await getServerSession(authOptions);

  const allAppointments: Appointment[] = await getData("appointment");
  const activeAppointments: Appointment[] = await getData(
    "appointment/findActiveAppointments"
  );
  const myAppointments: Appointment[] = await getData(
    `appointment/findByAgentId/${session?.userId}`
  );

  return (
    <Box m={30}>
      <Tabs
        color={SecondaryColor}
        variant="pills"
        defaultValue="AllAppointments"
      >
        <TabsList>
          <TabsTab value="MyAppointments">My Appointments</TabsTab>
          <TabsTab value="ActiveAppointments">Active Appointments</TabsTab>
          <TabsTab value="AllAppointments">All Appointments</TabsTab>
        </TabsList>
        <TabsPanel value="MyAppointments">
          <AppointmentList data={myAppointments} location="back_office" />
        </TabsPanel>
        <TabsPanel value="ActiveAppointments">
          <AppointmentList data={activeAppointments} location="back_office" />
        </TabsPanel>
        <TabsPanel value="AllAppointments">
          <AppointmentList data={allAppointments} location="back_office" />
        </TabsPanel>
      </Tabs>
    </Box>
  );
};

export default AppointmentsPage;

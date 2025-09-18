import AppointmentDetail from "@/app/components/AppointmentDetail";
import { Appointment } from "@/app/config/type";
import { formatDate, formatTime, getData } from "@/app/config/utils";
import { Box } from "@mantine/core";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const AppointmentDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const appointment: Appointment = await getData(`Appointment/${id}`);
  return (
    <Box m={20}>
      <AppointmentDetail data={appointment} location="back_office" />
    </Box>
  );
};

export default AppointmentDetailPage;

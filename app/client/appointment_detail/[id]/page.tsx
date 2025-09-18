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
  console.log({ appointment });
  return (
    <Box pt={80}>
      <AppointmentDetail data={appointment} />
    </Box>
  );
};

export default AppointmentDetailPage;

import AppointmentDetail from "@/app/components/AppointmentDetail";
import OurServiceDetail from "@/app/components/landing/OurServiceDetail";
import { Appointment, OurService } from "@/app/config/type";
import { formatDate, formatTime, getData } from "@/app/config/utils";
import { Box } from "@mantine/core";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const OurServiceDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const service: OurService = await getData(`findOneOurService/${id}`);
  return (
    <Box m={20}>
      <OurServiceDetail data={service} location="back_office" />
    </Box>
  );
};

export default OurServiceDetailPage;

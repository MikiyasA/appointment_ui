import React from "react";
import DateTimePicker from "./DateTimePicker";
import { AuthSessionProvider } from "@/app/components/AuthSessionProvider";
import { Box } from "@mantine/core";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getData, postData } from "@/app/config/utils";

const BookAppointment = async () => {
  const session = await getServerSession(authOptions);
  const dateAvailability: any = await postData(
    "Appointment/getMonthlyAvailability",
    { year: 2025, month: 8 },
    "POST"
  );
  const data = await getData("category/get_complete_questionnaire");
  return (
    <AuthSessionProvider session={session}>
      <Box pt={60}>
        <DateTimePicker questionerData={data} />;
      </Box>
    </AuthSessionProvider>
  );
};

export default BookAppointment;

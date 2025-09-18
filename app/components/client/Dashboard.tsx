import { DarkerColor, PrimaryColor, SecondaryColor } from "@/app/config/color";
import { formatDate, formatTime } from "@/app/config/utils";

import {
  Box,
  Button,
  Card,
  CardSection,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import AppointmentList from "../AppointmentList";
import { Appointment } from "@/app/config/type";

interface Props {
  data: [
    {
      id: string;
      status: string;
      startTime: string;
      endTime: string;
    }
  ];
}
const Dashboard = ({ data }: Props) => {
  return (
    <Box p={30}>
      <Card shadow="sm" p={30} radius="md" withBorder>
        <CardSection>
          <Box>
            <Title order={3} c={DarkerColor} mb={20}>
              Welcome to Your Client Portal!
            </Title>
            <Text mb={20}>
              Manage your appointments and provide us with valuable information
              to serve you better.
            </Text>
          </Box>
        </CardSection>
        <Box>
          <Title order={4} c={SecondaryColor} mb={20}>
            Upcoming Appointments
          </Title>
          <AppointmentList data={data as any} location="client" />{" "}
          {/** TODO: type issue */}
          <Group mt={20}>
            <Link href={""}>
              <Button color={SecondaryColor}>View All Appointment</Button>
            </Link>
            <Link href={"/client/book_appointment"} color={SecondaryColor}>
              <Button color={SecondaryColor}>Book A New Appointment</Button>
            </Link>
          </Group>
        </Box>
      </Card>
    </Box>
  );
};

export default Dashboard;

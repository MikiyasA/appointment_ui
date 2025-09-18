import {
  Box,
  Card,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  SimpleGrid,
  Text,
} from "@mantine/core";
import React from "react";
import { formatDate, formatTime } from "../config/utils";
import Link from "next/link";
import { Appointment } from "../config/type";
import OpenModalIcon from "./OpenModalIcon";
import { DarkerColor, PrimaryColor, SecondaryColor } from "../config/color";
import {
  IconClockHour3,
  IconDotsVertical,
  IconEdit,
  IconUserEdit,
  IconUsersPlus,
} from "@tabler/icons-react";
import { statusBadgeFormatter } from "../config/jsx_utils";
import OpenModalButton from "./OpenModalButton";
import { AddUpdateGuestForm } from "./back_office/AppointmentForm";
import MenuList from "./MenuList";

interface Prop {
  data: Appointment[];
  location: string;
}
const AppointmentList = ({ data, location }: Prop) => {
  return (
    <Box m={20}>
      {data.length >= 1 && (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {data?.map((el, i) => (
            <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <Link
                  href={`/${location}/appointment_detail/${el.id}`}
                  style={{ minWidth: "80%" }}
                >
                  <Text>Date: {formatDate(el?.startTime)}</Text>
                  <Text>From: {formatTime(el?.startTime)}</Text>
                  <Text>To: {formatTime(el?.endTime)}</Text>
                  <Text tt={"capitalize"}>
                    Status: {statusBadgeFormatter(el?.status)}
                  </Text>
                </Link>
                <MenuList data={el} />
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default AppointmentList;

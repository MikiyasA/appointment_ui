"use client";
import Questionnaires from "@/app/components/back_office/Questionnaires";
import { DarkerColor, PrimaryColor } from "@/app/config/color";
import { Category } from "@/app/config/type";
import { postData } from "@/app/config/utils";
import { Box, Button, Card, Center, Group, Text, Title } from "@mantine/core";
import { DatePicker, TimeGrid } from "@mantine/dates";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

interface DateAvailabilityProp {
  //   dateAvailability: {
  bookedDate: string[];
  openDates: {
    date: string;
    time: string[];
  }[];
  //   };
}
interface Props {
  questionerData: Category[];
}
const DateTimePicker = ({ questionerData }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [data, setData] = useState<DateAvailabilityProp>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>();

  const [formPlace, setFormPlace] = useState<string | null>("calendar");

  useEffect(() => {
    const handleChange = async () => {
      const date = new Date((selectedDate as string) || new Date());
      const dateAvailability: any = await postData(
        "Appointment/getMonthlyAvailability",
        { year: date?.getFullYear(), month: date?.getMonth() + 1 },
        "POST"
      );
      setData(dateAvailability.data);
    };
    handleChange();

    if (selectedDate && selectedTime) {
      const combined = `${selectedDate}T${selectedTime}`;
      setSelectedStartTime(new Date(combined));
    } else {
      setSelectedStartTime(null);
    }
  }, [selectedDate, selectedTime]);
  const handleExclude = (date: string) => {
    const formatted: string = dayjs(date).format("YYYY-MM-DD");
    return data?.bookedDate?.includes(formatted) ?? true;
  };
  const getTimeSlotsForDate = (selectedDate: string | null) => {
    if (!selectedDate) return [];
    const formatted = dayjs(selectedDate).format("YYYY-MM-DD");
    const match = data?.openDates?.find((entry) => entry.date === formatted);
    if (!match) return [];

    // Convert each UTC time slot into local time string
    return match.time.map((timeStr: string) => {
      const utcDateTime = dayjs.utc(`${formatted}T${timeStr}`);
      const localTime = utcDateTime.local().format("HH:mm"); // or "hh:mm A" for 12-hour format
      return localTime;
    });
  };
  const availableTimes = getTimeSlotsForDate(selectedDate);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offset = dayjs().tz(timeZone).format("Z");
  const label = `Select date and time in your local time zone (${timeZone},  UTC${offset})`;

  return (
    <Center p={30}>
      <Card shadow="md" withBorder w={"fit-content"} p={30}>
        {formPlace === "calendar" ? (
          <Box>
            <Text py={20}>{label}</Text>
            <Group w={"fit-content"}>
              <DatePicker
                minDate={new Date(Date.now() + 24 * 60 * 60 * 1000)} // today + 1 day
                allowDeselect
                value={selectedDate}
                onChange={setSelectedDate}
                excludeDate={handleExclude}
                onPreviousMonth={setSelectedDate}
                onNextMonth={setSelectedDate}
                hideOutsideDates
              />
              <TimeGrid
                miw={300}
                data={availableTimes}
                value={selectedTime}
                onChange={setSelectedTime}
                format="12h"
                allowDeselect
                simpleGridProps={{
                  cols: { base: 2, sm: 3, lg: 4 },
                  spacing: "xs",
                }}
              />
            </Group>
            <Group justify="end">
              <Button
                color={DarkerColor}
                disabled={!selectedStartTime}
                onClick={() => setFormPlace("form")}
              >
                Confirm
              </Button>
            </Group>
          </Box>
        ) : (
          <Box>
            <Questionnaires
              initialData={questionerData}
              selectedStartTime={selectedStartTime}
              setFormPlace={setFormPlace}
            />
          </Box>
        )}
      </Card>
    </Center>
  );
};

export default DateTimePicker;

"use client";
import { GenericDataTable } from "@/app/components/DataTable";
import { PrimaryColor, SecondaryColor, DarkerColor } from "@/app/config/color";
import { Schedule, ScheduleItem } from "@/app/config/type";
import { useApi } from "@/app/config/useApi";
import { formatDateTime } from "@/app/config/utils";
import { Button } from "@/components/ui/button";
import {
  Box,
  Center,
  Group,
  Indicator,
  Button as MantineButton,
} from "@mantine/core";
import { DatePicker, DatePickerProps } from "@mantine/dates";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { activeLabel } from "@/app/config/jsx_utils";
import { BulkScheduleForm, MultiDateScheduleForm } from "./ScheduleForm";
import { modals } from "@mantine/modals";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";

const DateSelector = () => {
  const { fetchGet, loading, success } = useApi();
  const { fetchGet: fetchCalender } = useApi();

  const [dateValue, setDateValue] = useState(new Date().toISOString());
  const [selectedDate, setSelectedDate] = useState<string | null>(
    new Date().toISOString()
  );
  const [data, setData] = useState<ScheduleItem[]>();

  useEffect(() => {
    const fetchData = async () => {
      if (dateValue) {
        const year = new Date(dateValue).getFullYear();
        const month = new Date(dateValue).getMonth() + 1;
        const result = await fetchGet(`schedule/${year}/${month}`);
        setData(result || []);
      }
    };

    fetchData();
  }, [dateValue]);

  const dayRenderer: DatePickerProps["renderDay"] = (date) => {
    const day = dayjs(date).date();
    const count = data?.filter((item) =>
      dayjs(item.startTime).isSame(date, "day")
    ).length;

    return (
      <Indicator
        disabled={count === 0}
        label={count}
        size={10}
        color={SecondaryColor}
        // offset={-5}
        styles={{
          indicator: {
            fontSize: 12,
            fontWeight: 500,
            padding: 0,
          },
        }}
      >
        <div>{day}</div>
      </Indicator>
    );
  };

  const agentsOfTheDay = data?.filter((item) =>
    dayjs(item.startTime).isSame(selectedDate, "day")
  );

  const [updatedData, setUpdatedData] = useState(agentsOfTheDay);
  const refreshData = async () => {
    const year = new Date(dateValue).getFullYear();
    const month = new Date(dateValue).getMonth() + 1;
    const result = await fetchGet(`schedule/${year}/${month}`);
    setUpdatedData(result);
  };

  let events = [
    {
      title: "John",
      start: "2025-09-08",
      end: "2025-09-09",
      editable: true,
      startEditable: true,
      durationEditable: true,
    },
    {
      title: "Sarah",
      start: "2025-09-10T00:00:00",
      end: "2025-09-10T22:00:00",
      editable: true,
      startEditable: true,
      durationEditable: true,
    },
  ];

  const [currentCalender, setCurrentCalender] = useState();
  const [currentMyCalender, setCurrentMyCalender] = useState();

  const handleDatesSet = async (arg: any) => {
    const currentStart = arg.view.currentStart;
    const month = currentStart.getMonth() + 1;
    const year = currentStart.getFullYear();

    const data: Schedule[] = await fetchCalender(`schedule/${year}/${month}`);
    const events = data.map((event) => ({
      title: `${event.firstName} ${event.lastName}`,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
    }));

    setCurrentCalender(events as any);
  };
  const handleMyDatesSet = async (arg: any) => {
    const currentStart = arg.view.currentStart;
    const month = currentStart.getMonth() + 1;
    const year = currentStart.getFullYear();

    console.log(year, month);
    const data: Schedule[] = await fetchCalender(
      `schedule/${year}/${month}/9aa2bae1-a0f9-4beb-be2d-a708646d2966`
    );
    const events = data.map((event) => ({
      title: `${event.firstName} ${event.lastName}`,
      start: new Date(event.startTime),
      end: new Date(event.endTime),
    }));

    setCurrentMyCalender(events as any);
  };
  return (
    <Box p={20}>
      <Group m={20}>
        <MantineButton
          color={SecondaryColor}
          onClick={() =>
            modals.open({
              title: "Create Schedule in bulk",
              children: (
                <BulkScheduleForm action="add" refreshData={refreshData} />
              ),
            })
          }
        >
          Bulk Schedule Create
        </MantineButton>
        <MantineButton
          color={SecondaryColor}
          onClick={() =>
            modals.open({
              title: "Create Schedule in bulk",
              children: (
                <MultiDateScheduleForm action="add" refreshData={refreshData} />
              ),
            })
          }
        >
          Multi Date Schedule Create
        </MantineButton>
      </Group>

      <Tabs defaultValue="mySchedule" color={SecondaryColor}>
        <TabsList>
          <TabsTab value="mySchedule">My Schedule</TabsTab>
          <TabsTab value="Schedule">All Schedule</TabsTab>
          <TabsTab value="duty">Duty Schedule</TabsTab>
        </TabsList>

        <TabsPanel value="mySchedule" pt="md">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={currentMyCalender}
            datesSet={handleMyDatesSet}
            firstDay={1}
          />
        </TabsPanel>
        <TabsPanel value="Schedule" pt="md">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={currentCalender}
            datesSet={handleDatesSet}
          />
        </TabsPanel>
        <TabsPanel value="duty" pt="md">
          <Center style={{ flexDirection: "column" }}>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              onPreviousMonth={setDateValue}
              onNextMonth={setDateValue}
              renderDay={dayRenderer}
            />

            {data && (
              <GenericDataTable
                data={(updatedData || agentsOfTheDay) as ScheduleItem[]}
                columnHeadings={[
                  "idNo",
                  "firstName",
                  "lastName",
                  "email",
                  "startTime",
                  "endTime",
                  "isActive",
                ]}
                columnFormatters={{
                  startTime: formatDateTime,
                  endTime: formatDateTime,
                  isActive: activeLabel,
                }}
                selectable
                // action={action}
                noDataText="No one scheduled today"
              />
            )}
          </Center>
        </TabsPanel>
        {/* <TabsPanel value="google" pt="md">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              googleCalendarPlugin,
            ]}
            initialView="dayGridMonth"
            height="auto"
            googleCalendarApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            events={{
              googleCalendarId: "your_calendar_id@group.calendar.google.com",
            }}
          />
        </TabsPanel> */}
      </Tabs>

      <Box m={30} />
    </Box>
  );
};

export default DateSelector;

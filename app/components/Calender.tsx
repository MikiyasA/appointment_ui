"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";

const Calender = () => {
  const events = [
    {
      name: "John",
      start: "2025-09-08",
      end: "2025-09-09",
    },
    {
      name: "Sarah",
      start: "2025-09-10",
      end: "2025-09-11",
    },
  ];
  return (
    <Tabs defaultValue="google">
      <TabsList>
        <TabsTab value="google">Google Calendar</TabsTab>
        <TabsTab value="duty">Duty Schedule</TabsTab>
      </TabsList>

      <TabsPanel value="google" pt="md">
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
      </TabsPanel>

      <TabsPanel value="duty" pt="md">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          events={events}
        />
      </TabsPanel>
    </Tabs>
  );
};

export default Calender;

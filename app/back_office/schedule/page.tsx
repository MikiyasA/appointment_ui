import { Box, Center, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
import React from "react";
import DateSelector from "./DateSelector";
import Calender from "@/app/components/Calender";

const SchedulePage = () => {
  return (
    <Box>
      <DateSelector />
    </Box>
  );
};

export default SchedulePage;

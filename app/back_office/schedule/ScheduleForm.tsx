import { SecondaryColor } from "@/app/config/color";
import {
  Agent,
  BullScheduleCreate,
  MultiDateScheduleCreate,
} from "@/app/config/type";
import { useApi } from "@/app/config/useApi";
import { Button, MultiSelect, Select } from "@mantine/core";
import { DatePickerInput, MonthPickerInput, TimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import React, { useEffect, useState } from "react";

interface Props {
  data?: BullScheduleCreate;
  action: "add" | "update";
  location?: string;
  refreshData?: () => void;
}
export const BulkScheduleForm = ({
  data,
  action,
  location,
  refreshData,
}: Props) => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      yearMonth: data?.yearMonth,
      dateNumbers: data?.dateNumbers,
      agents: data?.agents,
      sTime: data?.sTime,
      eTime: data?.eTime,
      status: data?.status || "Active",
    },
    validate: (values): Partial<Record<keyof BullScheduleCreate, string>> => {
      const errors: Partial<Record<keyof BullScheduleCreate, string>> = {};

      if (values.sTime && values.eTime && values.eTime <= values.sTime) {
        errors.eTime = "End time must be after start time";
      }
      if (values?.agents?.length && values?.agents?.length <= 0) {
        errors.agents = "At least one Agent should be selected";
      }
      if (values?.dateNumbers?.length && values?.dateNumbers?.length <= 0) {
        errors.agents = "At least one Day should be selected";
      }

      return errors;
    },
  });
  const [agents, setAgents] = useState<Agent[]>();
  const { fetchGet } = useApi();
  const { fetchPost, loading, success } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "add") {
      fetchPost(`schedule/bulkCreate`, form.values, "POST");
    }
  };
  useEffect(() => {
    const fetchAgents = async () => {
      const agentsData = await fetchGet("agent/activeAgentsStaffs");
      setAgents(agentsData);

      if (success) {
        modals.closeAll();
        // refreshData(); // TODO
      }
    };

    fetchAgents();
  }, [success]);

  const days = [
    { key: 1, name: "Monday" },
    { key: 2, name: "Tuesday" },
    { key: 3, name: "Wednesday" },
    { key: 4, name: "Thursday" },
    { key: 5, name: "Friday" },
    { key: 6, name: "Saturday" },
    { key: 0, name: "Sunday" },
  ];

  console.log(form.values);
  return (
    <form onSubmit={handleSubmit}>
      <MonthPickerInput
        label="Pick Year & Month"
        placeholder="Pick Year & Month"
        key={form.key("idNo")}
        {...form.getInputProps("yearMonth")}
        required
      />
      <MultiSelect
        label="Select Days"
        placeholder="Select Days"
        data={days.map((x) => ({
          value: `${x.key}`,
          label: x.name,
        }))}
        key={form.key("dateNumbers")}
        {...form.getInputProps("dateNumbers")}
        required
      />
      <MultiSelect
        label="Select Agents"
        placeholder=" Select Agents"
        data={agents?.map((x) => ({
          value: x.id,
          label: `${x.firstName} ${x.lastName}`,
        }))}
        key={form.key("agents")}
        {...form.getInputProps("agents")}
        required
      />
      <TimePicker
        label="Enter start time"
        withDropdown
        format="12h"
        mt="md"
        {...form.getInputProps("sTime")}
        required
      />
      <TimePicker
        label="End start time"
        withDropdown
        format="12h"
        mt="md"
        min={form.values.sTime}
        {...form.getInputProps("eTime")}
        required
      />
      <Select
        label="Status"
        placeholder=" Status"
        data={["Active", "To be Checked"]}
        key={form.key("status")}
        {...form.getInputProps("status")}
      />

      <Button
        mt={10}
        type="submit"
        loading={loading}
        color={SecondaryColor}
        disabled={!form.isValid()}
      >
        Submit
      </Button>
    </form>
  );
};

interface PropsMulti {
  data?: MultiDateScheduleCreate;
  action: "add" | "update";
  location?: string;
  refreshData: () => void;
}
export const MultiDateScheduleForm = ({
  data,
  action,
  location,
  refreshData,
}: PropsMulti) => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      listOfDays: data?.listOfDays,
      agents: data?.agents,
      sTime: data?.sTime,
      eTime: data?.eTime,
      status: data?.status || "Active",
    },
    validate: (values): Partial<Record<keyof BullScheduleCreate, string>> => {
      const errors: Partial<Record<keyof BullScheduleCreate, string>> = {};

      if (values.sTime && values.eTime && values.eTime <= values.sTime) {
        errors.eTime = "End time must be after start time";
      }
      if (values?.agents?.length && values?.agents?.length <= 0) {
        errors.agents = "At least one Agent should be selected";
      }
      if (values?.listOfDays?.length && values?.listOfDays?.length <= 0) {
        errors.agents = "At least one Day should be selected";
      }
      return errors;
    },
  });
  const [agents, setAgents] = useState<Agent[]>();
  const { fetchGet } = useApi();
  const { fetchPost, loading, success } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "add") {
      fetchPost(`schedule/createByMultiDates`, form.values, "POST");
    }
  };
  useEffect(() => {
    const fetchAgents = async () => {
      const agentsData = await fetchGet("agent/activeAgentsStaffs");
      setAgents(agentsData);

      if (success) {
        modals.closeAll();
        refreshData(); // TODO
      }
    };

    fetchAgents();
  }, [success]);
  console.log(form.values.listOfDays);
  return (
    <form onSubmit={handleSubmit}>
      <DatePickerInput
        type="multiple"
        label="Select Days"
        // placeholder="Select Days"
        key={form.key("listOfDays")}
        {...form.getInputProps("listOfDays")}
        clearable
        required
      />
      <MultiSelect
        label="Select Agents"
        placeholder=" Select Agents"
        data={agents?.map((x) => ({
          value: x.id,
          label: `${x.firstName} ${x.lastName}`,
        }))}
        key={form.key("agents")}
        {...form.getInputProps("agents")}
        required
      />
      <TimePicker
        label="Enter start time"
        withDropdown
        format="12h"
        mt="md"
        {...form.getInputProps("sTime")}
        required
      />
      <TimePicker
        label="End start time"
        withDropdown
        format="12h"
        mt="md"
        min={form.values.sTime}
        {...form.getInputProps("eTime")}
        required
      />
      <Select
        label="Status"
        placeholder=" Status"
        data={["Active", "To be Checked"]}
        key={form.key("status")}
        {...form.getInputProps("status")}
      />
      <Button
        mt={10}
        type="submit"
        loading={loading}
        color={SecondaryColor}
        disabled={!form.isValid()}
      >
        Submit
      </Button>
    </form>
  );
};

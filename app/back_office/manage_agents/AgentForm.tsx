import { SecondaryColor } from "@/app/config/color";
import { Agent, Staff } from "@/app/config/type";
import { useApi } from "@/app/config/useApi";
import {
  Box,
  Button,
  Group,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import React, { useEffect, useState } from "react";

interface Props {
  data?: Agent;
  action: "add" | "update";
  location?: string;
  refreshData: () => void;
  usedPriority: (number | null)[] | undefined;
  assignedStaff: (string | null)[] | undefined;
}
const AgentForm = ({
  data,
  action,
  location,
  refreshData,
  usedPriority,
  assignedStaff,
}: Props) => {
  console.log(data, usedPriority);
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      id: data?.id,
      staffId: data?.staffId,
      status: data?.status,
      priority: data?.priority,
    },
    validate: {
      staffId: (value) => (value == null ? "Staff must be selected" : null),
      status: (value) => (value == null ? "Status must be selected" : null),
      priority: (value) => {
        // If the value is null or undefined
        if (value == null) {
          return "Priority must be provided";
        }
        // Check if it's in usedPriority but is NOT the current data's priority
        if (usedPriority?.includes(value) && value !== data?.priority) {
          return "This priority is already used";
        }
        return null;
      },
    },
  });

  const { fetchGet } = useApi();
  const { fetchPost, loading, success } = useApi();

  const [staffAll, setStaffAll] = useState<Staff[] | []>();
  const [staff, setStaff] = useState<Staff[] | []>();
  const fetchStaff = async () => {
    try {
      const res = await fetchGet("staff");
      setStaffAll(res);
      const filtered = res.filter((x: Staff) => !assignedStaff?.includes(x.id));
      setStaff(filtered);
    } catch (err) {
      console.error("Failed to fetch staff", err);
    }
  };
  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "add") {
      fetchPost(`agent`, form.values, "POST");
    } else if (action === "update") {
      fetchPost(`agent/${form.values.id}`, form.values, "PATCH");
    }
  };
  useEffect(() => {
    if (success) {
      modals.closeAll();
      refreshData();
    }
    fetchStaff();
  }, [success]);

  const fullName = `${
    staffAll?.find((x) => x.id === data?.staffId)?.firstName
  } ${staffAll?.find((x) => x.id === data?.staffId)?.lastName}`;

  return (
    <form onSubmit={handleSubmit}>
      {action === "update" ? (
        <TextInput label="Staff" value={fullName} disabled />
      ) : (
        <Select
          required
          label="Staff"
          data={staff?.map((el) => ({
            value: el.id,
            label: `${el.firstName} ${el.lastName}`,
          }))}
          key={form.key("staffId")}
          {...form.getInputProps("staffId")}
          nothingFoundMessage="No Staff or unassigned staff available"
        />
      )}

      <Select
        required
        withAsterisk
        label="Status"
        data={["Active", "Inactive"]}
        key={form.key("status")}
        {...form.getInputProps("status")}
      />
      <NumberInput
        required
        label="Priority"
        min={1}
        {...form.getInputProps("priority")}
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

export default AgentForm;

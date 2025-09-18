import { SecondaryColor } from "@/app/config/color";
import { Staff } from "@/app/config/type";
import { useApi } from "@/app/config/useApi";
import {
  Box,
  Button,
  Group,
  MultiSelect,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import React, { useEffect } from "react";

interface Props {
  data: Staff;
  action: "add" | "update";
  location?: string;
  refreshData: () => void;
}
const StaffForm = ({ data, action, location, refreshData }: Props) => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      id: data?.id,
      idNo: data?.idNo,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      status: data?.status,
      role: data?.role,
    },
  });
  const { fetchPost, fetchGet, loading, success } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "add") {
      fetchPost(`staff`, form.values, "POST");
    } else if (action === "update") {
      fetchPost(`staff/${form.values.id}`, form.values, "PATCH");
    }
  };
  useEffect(() => {
    if (success) {
      modals.closeAll();
      refreshData();
    }
  }, [success]);
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Id No"
        placeholder="Your Id No"
        key={form.key("idNo")}
        {...form.getInputProps("idNo")}
      />
      <TextInput
        label="First Name"
        placeholder="Your First Name"
        key={form.key("firstName")}
        {...form.getInputProps("firstName")}
      />
      <TextInput
        label="Last Name"
        placeholder="Your Last Name"
        key={form.key("lastName")}
        {...form.getInputProps("lastName")}
      />
      <TextInput
        label="Email"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <Select
        withAsterisk
        label="Status"
        data={["New", "Active", "Inactive"]}
        key={form.key("status")}
        {...form.getInputProps("status")}
      />
      <MultiSelect
        withAsterisk
        label="Role"
        data={["Agent", "Supervisor", "Admin"]} // TODO: tole to be dynamic from database
        key={form.key("role")}
        {...form.getInputProps("role")}
      />

      <Button mt={10} type="submit" loading={loading} color={SecondaryColor}>
        Submit
      </Button>
    </form>
  );
};

export default StaffForm;

import { SecondaryColor } from "@/app/config/color";
import { Client } from "@/app/config/type";
import { useApi } from "@/app/config/useApi";
import { Box, Button, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import React, { useEffect } from "react";

interface Props {
  data: Client;
  action: "add" | "update";
  location?: string;
  refreshData: () => void;
}
const ClientProfileForm = ({ data, action, location, refreshData }: Props) => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      id: data?.id,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      status: data?.status,
    },
  });
  const { fetchPost, fetchGet, loading, success } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "add") {
      fetchPost(`clients`, form.values, "POST");
    } else if (action === "update") {
      fetchPost(`clients/${form.values.id}`, form.values, "PATCH");
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
        label="First Name"
        placeholder="Your First Name"
        key={form.key("firstName")}
        {...form.getInputProps("firstName")}
        disabled={location !== "client"}
      />
      <TextInput
        label="Last Name"
        placeholder="Your Last Name"
        key={form.key("lastName")}
        {...form.getInputProps("lastName")}
        disabled={location !== "client"}
      />
      <TextInput
        label="Email"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
        disabled={location !== "client"}
      />
      <Select
        withAsterisk
        label="Status"
        data={["Auto-Added", "Loyal", "Premium"]}
        key={form.key("status")}
        {...form.getInputProps("status")}
      />
      <Button mt={10} type="submit" loading={loading} color={SecondaryColor}>
        Submit
      </Button>
    </form>
  );
};

export default ClientProfileForm;

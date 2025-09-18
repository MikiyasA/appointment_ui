"use client";
import { SecondaryColor } from "@/app/config/color";
import { Agent, Appointment } from "@/app/config/type";
import { useApi } from "@/app/config/useApi";
import {
  TextInput,
  Select,
  MultiSelect,
  Button,
  TagsInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import React, { useEffect, useState } from "react";
import MyRichTextEditor from "../MyRichTextEditor";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  data: Appointment;
  action: "add" | "update";
  location: string;
  refreshData: () => void;
}
const AppointmentForm = ({ data, action, location, refreshData }: Props) => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      id: data?.id,
      //   idNo: data?.idNo,
      //   firstName: data?.firstName,
      //   lastName: data?.lastName,
      //   email: data?.email,
      //   status: data?.status,
      //   role: data?.role,
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

export default AppointmentForm;

interface AUCProps {
  data: Appointment;
  action?: "add" | "update";
  location?: string;
}
export const AddUpdateCommentForm = ({ data, action, location }: AUCProps) => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      id: data?.id,
      comments: data?.comments,
    },
  });
  const { refresh } = useRouter();
  const { fetchPost, fetchGet, loading, success } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPost(`appointment/addUpdateComment`, form.values, "POST");
  };
  useEffect(() => {
    if (success) {
      modals.closeAll();
      refresh();
    }
  }, [success]);
  return (
    <form onSubmit={handleSubmit}>
      <MyRichTextEditor
        label="Comments"
        form={form}
        content={form.values.comments}
        inputName={"comments"}
      />
      <Button mt={10} type="submit" loading={loading} color={SecondaryColor}>
        Submit
      </Button>
    </form>
  );
};

interface UAProps {
  data: Appointment;
}
export const UpdateAgentForm = ({ data }: UAProps) => {
  const { data: session } = useSession();

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      id: data?.id,
      agentId: data?.agentId,
      accessToken: session?.accessToken,
    },
  });
  const { refresh } = useRouter();
  const { fetchPost, loading, success } = useApi();
  const { fetchGet, loading: loadingAgent } = useApi();
  const [agents, setAgents] = useState<Agent[]>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPost(`appointment/${data?.id}`, form.values, "PATCH");
  };

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agt = await fetchGet(
          `agent/findAvailableAgents/${data?.startTime}/${data?.endTime}`
        );
        setAgents(agt);
      } catch (error) {
        console.error("Failed to fetch agents:", error);
      }
    };
    fetchAgents();
  }, [data]);

  useEffect(() => {
    if (success) {
      modals.closeAll();
      refresh();
    }
  }, [success, agents]);

  console.log(agents, form.values);
  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Agent"
        data={agents?.map((el) => ({
          value: el.id,
          label: `${el.staff.firstName} ${el.staff.lastName}`,
        }))}
        nothingFoundMessage="No other Agent is available"
        {...form.getInputProps("agentId")}
      />
      <Button
        mt={10}
        type="submit"
        loading={loading || loadingAgent}
        color={SecondaryColor}
      >
        Submit
      </Button>
    </form>
  );
};

interface USProps {
  data: Appointment;
}
export const UpdateStatusForm = ({ data }: USProps) => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      id: data?.id,
      status: data?.status,
    },
  });
  const { refresh } = useRouter();
  const { fetchPost, loading, success } = useApi();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPost(`appointment/${data?.id}`, form.values, "PATCH");
  };

  useEffect(() => {
    if (success) {
      modals.closeAll();
      refresh();
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Status"
        data={["New", "Confirmed", "Attended", "Missed", "Re-booked", "Closed"]}
        nothingFoundMessage="No other Agent is available"
        {...form.getInputProps("status")}
      />
      <Button mt={10} type="submit" loading={loading} color={SecondaryColor}>
        Submit
      </Button>
    </form>
  );
};

interface AUGProps {
  data: Appointment;
}
export const AddUpdateGuestForm = ({ data }: AUGProps) => {
  const { data: session } = useSession();

  const form = useForm({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    initialValues: {
      id: data?.id,
      guests: data?.guests ?? [],
      accessToken: session?.accessToken,
    },
    validate: {
      guests: (v) => {
        const invalid =
          v?.find((el) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el)) ||
          v?.length < 1;
        return invalid ? `Invalid email: ${invalid}` : null;
      },
    },
  });
  const { refresh } = useRouter();
  const { fetchPost, loading, success } = useApi();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchPost(`appointment/${data?.id}`, form.values, "PATCH");
  };
  console.log(data);

  useEffect(() => {
    if (success) {
      modals.closeAll();
      refresh();
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit}>
      <TagsInput
        label="Guests"
        placeholder="Enter guest email"
        {...form?.getInputProps("guests")}
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

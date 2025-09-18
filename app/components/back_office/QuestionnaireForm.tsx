"use client";
import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Button, Checkbox, Group, Textarea, TextInput } from "@mantine/core";
import { SecondaryColor } from "@/app/config/color";
import { useApi } from "@/app/config/useApi";
import { modals } from "@mantine/modals";

interface CProps {
  formData?: {
    id: string;
    title: string;
    description?: string;
    isArchived: boolean;
  };
  action: string;
  id?: string;
  onSuccess?: () => void;
}
export const CategoryForm = ({ formData, action, onSuccess }: CProps) => {
  console.log({ formData });
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      title: formData?.title ?? "",
      description: formData?.description ?? "",
      isArchived: formData?.isArchived ?? false,
    },
    validate: {
      title: (value) =>
        value?.length < 5 ? "Title must be at least 5 characters" : null,
    },
  });

  const { loading, success, fetchPost } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "add") {
      fetchPost("category", form.values, "POST");
    } else if (action === "update") {
      fetchPost(`category/${formData?.id}`, form.values, "PATCH");
    }
  };
  useEffect(() => {
    if (success) {
      modals.closeAll();
      onSuccess?.();
    }
  }, [success]);
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        pb={10}
        label="Category Title"
        placeholder="Category Title"
        required
        {...form.getInputProps("title")}
      />
      <Textarea
        pb={10}
        label="Category Description"
        placeholder="Category Description"
        {...form.getInputProps("description")}
      />
      <Checkbox
        pb={10}
        color="red"
        c={"red"}
        label="Is Archived"
        placeholder="Is Archived"
        checked={form.values.isArchived}
        onChange={() =>
          form.setFieldValue("isArchived", !form.values.isArchived)
        }
      />
      <Button type="submit" color={SecondaryColor} loading={loading}>
        Submit
      </Button>
    </form>
  );
};

interface QProps {
  formData?: {
    id: string;
    text: string;
    multiAnswer?: boolean;
    categoryId: string;
    isArchived: boolean;
    otherAllowed?: boolean;
  };
  action: string;
  categoryId?: string;
  onSuccess?: () => void;
}
export const QuestionForm = ({
  formData,
  action,
  categoryId,
  onSuccess,
}: QProps) => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      text: formData?.text ?? "",
      multiAnswer: formData?.multiAnswer ?? false,
      categoryId: formData?.categoryId ?? categoryId ?? "",
      isArchived: formData?.isArchived ?? false,
      otherAllowed: formData?.otherAllowed ?? false,
    },
    validate: {
      text: (value) =>
        value?.length < 5 ? "Question must be at least 5 characters" : null,
    },
  });

  const { loading, success, fetchPost } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "add") {
      fetchPost("question", form.values, "POST");
    } else if (action === "update") {
      fetchPost(`question/${formData?.id}`, form.values, "PATCH");
    }
  };
  useEffect(() => {
    if (success) {
      modals.closeAll();
      onSuccess?.();
    }
  }, [success]);
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        pb={10}
        label="Question Text"
        placeholder="Question Text"
        required
        {...form.getInputProps("text")}
      />
      <Group>
        <Checkbox
          pb={10}
          label="Is Multi Answer"
          placeholder="Is Multi Answer"
          checked={form.values.multiAnswer}
          onChange={() =>
            form.setFieldValue("multiAnswer", !form.values.multiAnswer)
          }
        />
        <Checkbox
          pb={10}
          color="red"
          c={"red"}
          label="Is Archived"
          placeholder="Is Archived"
          checked={form.values.isArchived}
          onChange={() =>
            form.setFieldValue("isArchived", !form.values.isArchived)
          }
        />
        <Checkbox
          pb={10}
          label="Other Allowed"
          placeholder="Other Allowed"
          checked={form.values.otherAllowed}
          onChange={() =>
            form.setFieldValue("otherAllowed", !form.values.otherAllowed)
          }
        />
      </Group>
      <Button type="submit" color={SecondaryColor} loading={loading}>
        Submit
      </Button>
    </form>
  );
};

interface OProps {
  formData?: {
    id: string;
    text: string;
    questionId: string;
    isArchived: boolean;
  };
  action: string;
  questionId?: string;
  onSuccess?: () => void;
}
export const OptionForm = ({
  formData,
  action,
  questionId,
  onSuccess,
}: OProps) => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      text: formData?.text ?? "",
      questionId: formData?.questionId ?? questionId ?? "",
      isArchived: formData?.isArchived ?? false,
    },
    validate: {
      text: (value) =>
        value?.length < 5 ? "The Option must be at least 5 characters" : null,
    },
  });

  const { loading, success, fetchPost } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "add") {
      fetchPost("options", form.values, "POST");
    } else if (action === "update") {
      fetchPost(`options/${formData?.id}`, form.values, "PATCH");
    }
  };
  useEffect(() => {
    if (success) {
      modals.closeAll();
      onSuccess?.();
    }
  }, [success]);
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        pb={10}
        label="options Text"
        placeholder="options Text"
        required
        {...form.getInputProps("text")}
      />

      <Checkbox
        pb={10}
        color="red"
        c={"red"}
        label="Is Archived"
        placeholder="Is Archived"
        checked={form.values.isArchived}
        onChange={() =>
          form.setFieldValue("isArchived", !form.values.isArchived)
        }
      />

      <Button type="submit" color={SecondaryColor} loading={loading}>
        Submit
      </Button>
    </form>
  );
};

"use client";
import FileInputWithImage from "@/app/components/FileInputWithImage";
import MyRichTextEditor from "@/app/components/MyRichTextEditor";
import { DarkerColor, PrimaryColor, SecondaryColor } from "@/app/config/color";
import {
  Homepage,
  DetailService,
  OurService,
  About,
  SocialMedeaDetail,
} from "@/app/config/type";
import { useApi } from "@/app/config/useApi";
import { Button, Group, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { icons } from "lucide-react";
import { useRouter } from "next/navigation";
import { title } from "process";
import React, { useEffect, useState } from "react";

interface HomePageProps {
  data: Homepage;
}
export const HomePageForms = ({ data }: HomePageProps) => {
  const router = useRouter();
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      homePicture: data?.homePicture,
    },
  });

  const { fetchPost, loading, success } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(form.values);
    e.preventDefault();
    fetchPost(`createUpdateHomepage`, form.values, "POST", true);
  };

  useEffect(() => {
    if (success) {
      modals.closeAll();
      router.refresh();
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit}>
      <FileInputWithImage
        form={form}
        label="Attach Homepage Picture"
        placeholder="Homepage Picture"
        inputName="homePicture"
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

interface OurServicesProps {
  data?: OurService;
  action: "add" | "update";
}
export const OurServicesForms = ({ data, action }: OurServicesProps) => {
  const router = useRouter();
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      id: data?.id,
      icon: data?.icon,
      title: data?.title,
      description: data?.description,
      detail: data?.detail,
    },
  });

  const { fetchPost, loading, success } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(form.values);
    e.preventDefault();
    if (action === "add") {
      fetchPost(`createOurService`, form.values, "POST", true);
    } else if (action === "update") {
      fetchPost(
        `updateOurService/${form.values.id}`,
        form.values,
        "PATCH",
        true
      );
    }
  };

  useEffect(() => {
    if (success) {
      modals.closeAll();
      router.refresh();
    }
  }, [success]);
  console.log(form.values);
  return (
    <form onSubmit={handleSubmit}>
      <Group style={{ flexDirection: "column", alignItems: "stretch" }}>
        <FileInputWithImage
          form={form}
          label="Service Icon"
          placeholder="Service Icon"
          inputName="icon"
        />
        <TextInput
          label="Title"
          placeholder="Title"
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Description"
          placeholder="Description"
          {...form.getInputProps("description")}
        />
        <MyRichTextEditor
          label="Detail"
          form={form}
          content={form.values.detail}
          inputName={"detail"}
        />
      </Group>
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

interface DetailServicesProps {
  data?: DetailService;
  action: "add" | "update";
}
export const DetailServicesForms = ({ data, action }: DetailServicesProps) => {
  const router = useRouter();
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      id: data?.id,
      image: data?.image,
      title: data?.title,
      description: data?.description,
    },
  });

  const { fetchPost, loading, success } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(form.values);
    e.preventDefault();
    if (action === "add") {
      fetchPost(`createDetailService`, form.values, "POST", true);
    } else if (action === "update") {
      fetchPost(
        `updateDetailService/${form.values.id}`,
        form.values,
        "PATCH",
        true
      );
    }
  };

  useEffect(() => {
    if (success) {
      modals.closeAll();
      router.refresh();
    }
  }, [success]);
  console.log(form.values);
  return (
    <form onSubmit={handleSubmit}>
      <Group style={{ flexDirection: "column", alignItems: "stretch" }}>
        <FileInputWithImage
          form={form}
          label="Image"
          placeholder="Image"
          inputName="image"
        />
        <TextInput
          label="Title"
          placeholder="Title"
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Description"
          placeholder="Description"
          {...form.getInputProps("description")}
        />
      </Group>
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

interface AboutProps {
  data?: About;
}

export const AboutForms = ({ data }: AboutProps) => {
  const router = useRouter();
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      name: data?.name,
      description: data?.description,
    },
  });

  const { fetchPost, loading, success } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(form.values);
    e.preventDefault();
    fetchPost(`createUpdateAbout`, form.values, "POST");
  };

  useEffect(() => {
    if (success) {
      modals.closeAll();
      router.refresh();
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit}>
      <FileInputWithImage
        label="Picture"
        placeholder="Picture"
        form={form}
        inputName="picture"
      />
      <TextInput
        label="Name"
        placeholder="Name"
        {...form.getInputProps("name")}
      />
      <Textarea
        label="Description"
        placeholder="Description"
        {...form.getInputProps("description")}
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

interface SMProps {
  data?: SocialMedeaDetail;
  position?: "ContactUs" | "Footer" | "AboutUs" | null;
  action: "add" | "update";
  editable?: boolean;
  aboutId?: string;
}
export const SocialMediaDetailsForms = ({
  data,
  position,
  action,
  editable,
  aboutId,
}: SMProps) => {
  const router = useRouter();
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      id: data?.id,
      name: data?.name,
      icon: data?.icon,
      link: data?.link,
      aboutId: data?.aboutId || aboutId,
      position: position || data?.position,
    },
  });
  console.log(form.values);
  const { fetchPost, loading, success } = useApi();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(form.values);
    e.preventDefault();
    if (action === "add") {
      fetchPost(`createSocialMedeaDetail`, form.values, "POST", true);
    } else if (action === "update") {
      fetchPost(
        `updateSocialMedeaDetail/${form.values.id}`,
        form.values,
        "PATCH",
        true
      );
    }
  };

  useEffect(() => {
    if (!editable) {
      if (success) {
        modals.closeAll();
      }
    }
    router.refresh();
  }, [success]);

  return (
    <form onSubmit={handleSubmit}>
      <Group
        style={
          editable
            ? {}
            : {
                flexDirection: "column",
                justifyContent: "inherit",
                alignItems: "stretch",
              }
        }
      >
        {/* {editable && (
          <Button onClick={() => setEdit(!edit)} color={DarkerColor}>
            {edit ? "Edit" : "Close"}
          </Button>
        )} */}
        <FileInputWithImage
          miw={200}
          label="Icon"
          placeholder="Icon"
          form={form}
          inputName="icon"
          wnh={30}
          required
        />
        <TextInput
          miw={200}
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
          required
        />
        <Textarea
          miw={200}
          label="Link"
          placeholder="Link"
          {...form.getInputProps("link")}
          required
        />
        {/* {!edit && ( */}
        <Button
          mt={10}
          type="submit"
          loading={loading}
          color={SecondaryColor}
          disabled={!form.isValid()}
        >
          {editable ? "Update" : "Submit"}
        </Button>
        {/* )} */}
      </Group>
    </form>
  );
};

"use client";
import { FileInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DarkerColor } from "../config/color";

interface Props {
  form: UseFormReturnType<any>;
  inputName: string;
  label: string;
  placeholder: string;
  miw?: any;
  wnh?: number;
  disabled?: boolean;
  required?: boolean;
}
const FileInputWithImage = ({
  form,
  inputName,
  label,
  placeholder,
  miw,
  wnh,
  disabled,
  required,
}: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    const picture: any = form.values[inputName];
    if (picture instanceof File) {
      const objectUrl = URL.createObjectURL(picture);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    if (typeof picture === "string") {
      setPreviewUrl(picture);
    }
    if (!picture) {
      setPreviewUrl(null);
    }
  }, [form.values[inputName]]);
  const leftIcon = previewUrl && (
    <Image
      src={previewUrl}
      alt="Img"
      width={wnh || 50}
      height={wnh || 50}
      style={{
        borderRadius: 5,
        backgroundColor: DarkerColor,
      }}
    />
  );
  return (
    <FileInput
      miw={miw}
      disabled={disabled}
      leftSection={leftIcon}
      accept="image/*"
      label={label}
      placeholder={placeholder}
      leftSectionWidth={50}
      {...form.getInputProps(inputName)}
      required={required}
    />
  );
};

export default FileInputWithImage;

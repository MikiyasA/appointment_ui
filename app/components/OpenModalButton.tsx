"use client";
import { Box, Button, DefaultMantineColor } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

interface Props {
  buttonText: string;
  modalTitle?: string;
  children: React.ReactNode;
  color: DefaultMantineColor;
  location?: string;
}
const OpenModalButton = ({
  buttonText,
  modalTitle,
  children,
  color,
  location,
}: Props) => {
  return (
    <Box mt={20} mb={10}>
      {location === "back_office" && (
        <Button
          color={color}
          onClick={() =>
            modals.open({
              title: modalTitle || buttonText,
              size: "100%",
              children: <>{children}</>,
              yOffset: "80px",
            })
          }
        >
          {buttonText}
        </Button>
      )}
    </Box>
  );
};

export default OpenModalButton;

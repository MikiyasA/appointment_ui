"use client";
import {
  ActionIcon,
  Box,
  DefaultMantineColor,
  MantineSize,
  MantineStyleProp,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";
import { IconEdit, TablerIcon } from "@tabler/icons-react";

interface Props {
  iconText: string;
  modalTitle?: string;
  modalChildren: React.ReactNode;
  children: React.ReactNode;
  color: DefaultMantineColor;
  size: number | MantineSize;
  location?: string;
  style?: MantineStyleProp;
}
const OpenModalIcon = ({
  iconText,
  modalTitle,
  modalChildren,
  children,
  color,
  size,
  location,
  style,
}: Props) => {
  return (
    <Box>
      {location === "back_office" && (
        <Tooltip label={iconText}>
          <ActionIcon
            onClick={() =>
              modals.open({
                title: modalTitle || iconText,
                size: "100%",
                children: <>{modalChildren}</>,
                yOffset: "80px",
              })
            }
            color={color}
            size={size}
            variant="subtle"
            style={style}
          >
            {children}
          </ActionIcon>
        </Tooltip>
      )}
    </Box>
  );
};

export default OpenModalIcon;

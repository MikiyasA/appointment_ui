"use client";
import { DarkerColor, SecondaryColor } from "@/app/config/color";
import {
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconDotsVertical,
  IconClockHour3,
  IconUserEdit,
  IconUsersPlus,
} from "@tabler/icons-react";
import React from "react";
import {
  AddUpdateGuestForm,
  UpdateAgentForm,
  UpdateStatusForm,
} from "./back_office/AppointmentForm";

const MenuList = ({ data }: any) => {
  return (
    <Menu shadow="md">
      <MenuTarget>
        <IconDotsVertical color={DarkerColor} cursor={"pointer"} />
      </MenuTarget>
      <MenuDropdown>
        <MenuLabel>Action</MenuLabel>
        <MenuItem
          leftSection={<IconClockHour3 color={SecondaryColor} size={14} />}
        >
          Update Appointment Time
        </MenuItem>
        <MenuItem
          leftSection={<IconUserEdit color={SecondaryColor} size={14} />}
          onClick={() =>
            modals.open({
              title: "Update Agent",
              children: <UpdateAgentForm data={data} />,
            })
          }
        >
          Update Agent
        </MenuItem>
        <MenuItem
          leftSection={<IconUsersPlus color={SecondaryColor} size={14} />}
          onClick={() =>
            modals.open({
              title: "Add/Update Guests",
              size: "xl",
              children: <AddUpdateGuestForm data={data} />,
            })
          }
        >
          Add/Update Guests
        </MenuItem>
        <MenuItem
          leftSection={<IconUsersPlus color={SecondaryColor} size={14} />}
          onClick={() =>
            modals.open({
              title: "Update Status",
              children: <UpdateStatusForm data={data} />,
            })
          }
        >
          Update Status
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
};

export default MenuList;

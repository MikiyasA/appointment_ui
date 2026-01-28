import {
  Avatar,
  Box,
  Button,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
} from "@mantine/core";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { DarkerColor, PrimaryColor } from "../../config/color";
import { getServerSession } from "next-auth";
import { MobileLinksGroup, PCLinksGroup, UserMenu } from "./Hyperlinks";
import { NavSpacer } from "../NavSpacer";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const NavBarClient = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <nav
        id="nav-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 10px 5px 10px",
          background: DarkerColor,
          position: "fixed",
          width: "100%",
          boxShadow: `0px 3px 8px ${DarkerColor}`,
          zIndex: 999,
          color: "white",
        }}
      >
        <Group gap={1}>
          <Image
            src={"/logo-g.png"}
            alt="LOGO"
            width={80}
            height={70}
            style={{ borderRadius: 5 }}
          />
          <Text>Property Consultancy PLC</Text>
        </Group>
        <PCLinksGroup />
        <Group wrap="nowrap">
          <UserMenu session={session} />
          <MobileLinksGroup />
        </Group>
      </nav>
      <NavSpacer />
    </>
  );
};

export default NavBarClient;

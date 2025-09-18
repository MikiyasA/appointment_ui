import { Box, Group, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { DarkerColor, PrimaryColor } from "../../config/color";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MobileLinksGroupBO, PCLinksGroupBO, UserMenuBO } from "./HyperlinksBO";
import { NavSpacer } from "../NavSpacer";

const NavBarBackOffice = async () => {
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
          zIndex: 200,
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
          <Text>Back office</Text>
        </Group>
        <PCLinksGroupBO />
        <Group wrap="nowrap">
          <UserMenuBO session={session} />
          <MobileLinksGroupBO />
        </Group>
      </nav>
      <NavSpacer />
    </>
  );
};

export default NavBarBackOffice;

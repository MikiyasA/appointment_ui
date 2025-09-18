import { Box, Button, Group, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { DarkerColor, PrimaryColor } from "../../config/color";
import { MobileLinksGroup, PCLinksGroup } from "./ClickButton";
import { NavSpacer } from "../NavSpacer";

const NavBar = () => {
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
          boxShadow: `0px 10px 20px ${DarkerColor}`,
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
          <Link href={"/client"}>
            <Button color={PrimaryColor}>Contact BST</Button>
          </Link>
          <MobileLinksGroup />
        </Group>
      </nav>
      <NavSpacer />
    </>
  );
};

export default NavBar;

"use client";

import { Box, Button, Group, Menu, MenuItem, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCurrencyXrp, IconMenuDeep } from "@tabler/icons-react";
import React, { useState } from "react";
import { DarkerColor } from "../../config/color";

interface Props {
  text: string;
  href: string;
}

export const ClickButton = ({ text, href }: Props) => {
  function scrollToSection(id: string) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Button
      onClick={() => scrollToSection(href)}
      variant="subtle"
      px={10}
      w={isMobile ? "100%" : "fit-content"}
      style={{ color: "white" }}
    >
      {text}
    </Button>
  );
};

const LinksGroup = (
  <>
    <ClickButton text="HOME" href="home" />
    <ClickButton text="SERVICE" href="service" />
    <ClickButton text="ABOUT US" href="about_us" />
    <ClickButton text="CONTACT US" href="contact_us" />
  </>
);

export const PCLinksGroup = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return <>{!isMobile && <Group gap={1}>{LinksGroup}</Group>}</>;
};

export const MobileLinksGroup = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(false);

  return (
    <>
      {isMobile && (
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconMenuDeep size={30} />
          </Menu.Target>
          <Menu.Dropdown bg={DarkerColor}>
            <Group style={{ flexDirection: "column" }} wrap="nowrap" gap={2}>
              {LinksGroup}
            </Group>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
};

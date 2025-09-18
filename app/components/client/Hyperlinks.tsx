"use client";

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
import { useMediaQuery } from "@mantine/hooks";
import { IconCurrencyXrp, IconLogout, IconMenuDeep } from "@tabler/icons-react";
import React, { useState } from "react";
import { DarkerColor, HyperlinkHoverColor } from "../../config/color";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { modals } from "@mantine/modals";
import LogIn from "@/app/components/LogIn";
import { CompanyName } from "@/app/config/names";

interface Props {
  text: string;
  href: string;
}

export const Hyperlinks = ({ text, href }: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Link
      href={href}
      className={`px-2 py-1 hover:bg-green-400/20 transition rounded-md`}
    >
      {text}
    </Link>
  );
};

const LinksGroup = (
  <>
    <Hyperlinks text="Dashboard" href="/client" />
    <Hyperlinks text="My Appointments" href="/client/my_appointments" />
    <Hyperlinks text={`ABOUT ${CompanyName}`} href="/client/about_us" />
    <Hyperlinks text={`CONTACT ${CompanyName}`} href="/client/contact_us" />
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
          <MenuDropdown>
            <Group style={{ flexDirection: "column" }} wrap="nowrap" gap={2}>
              {LinksGroup}
            </Group>
          </MenuDropdown>
        </Menu>
      )}
    </>
  );
};

export const UserMenu = ({ session }: any) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Menu>
      {session ? (
        <MenuTarget>
          <Group>
            <>
              {session?.user?.profileImage ? (
                <Avatar src={session?.user?.profileImage} color="initials" />
              ) : (
                <Avatar
                  key={session?.user?.name}
                  name={session?.user?.name as string | undefined}
                  color="initials"
                  allowedInitialsColors={[
                    "grape",
                    "red",
                    "violet",
                    "yellow",
                    "lime",
                    "teal",
                    "cyan",
                  ]}
                />
              )}
            </>

            {!isMobile && (
              <Text size="sm" fw={500}>
                {session?.user?.name}
              </Text>
            )}
          </Group>
        </MenuTarget>
      ) : (
        <Avatar
          key={session?.user?.name}
          name={session?.user?.name as string | undefined}
          color="initials"
          onClick={() =>
            modals.open({
              children: (
                <LogIn
                  session={session}
                  location="/backOffice"
                  role="client"
                  inModal
                />
              ),
            })
          }
        />
      )}
      <MenuDropdown miw={200}>
        <MenuItem
          leftSection={<IconLogout color="red" />}
          onClick={() => signOut()}
        >
          Sign out
        </MenuItem>

        {/* <MenuItem
          leftSection={<IconLogout color="red" />}
          onClick={() => signOut()}
        >
          Sign out
        </MenuItem> */}
      </MenuDropdown>
    </Menu>
  );
};

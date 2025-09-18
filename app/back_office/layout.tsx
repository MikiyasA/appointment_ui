import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import {
  Box,
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import NavBarBackOffice from "../components/back_office/NavBarBackOffice";
import { NavSpacer } from "../components/NavSpacer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BST Property Consultancy",
  description: "BST Property Consultancy",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  if (session.access !== "staff") {
    redirect("/unauthorized"); // or a 403 page
  }
  return (
    <Box className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <MantineProvider>
        <NavBarBackOffice />

        <Box>{children}</Box>
      </MantineProvider>
    </Box>
  );
}

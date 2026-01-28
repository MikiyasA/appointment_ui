import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import "@mantine/core/styles.css";

import { Box, MantineProvider } from "@mantine/core";
import NavBarClient from "../components/client/NavBarClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

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

  return (
    <Box className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <MantineProvider>
        <NavBarClient />
        {children}
      </MantineProvider>
    </Box>
  );
}

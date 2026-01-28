import React from "react";
import LogIn from "../components/LogIn";
import { Box, Select } from "@mantine/core";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.access === "client") {
    redirect("/client");
  }
  if (session?.access === "staff") {
    redirect("/back_office");
  }

  return (
    <Box>
      <LogIn location="/client" role="client" />;
    </Box>
  );
};

export default LoginPage;

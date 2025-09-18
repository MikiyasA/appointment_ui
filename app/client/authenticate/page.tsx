import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthSessionProvider } from "@/app/components/AuthSessionProvider";
import { Box } from "@mantine/core";
import { getServerSession } from "next-auth";
import LogIn from "../../components/LogIn";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  console.log({ session });
  return (
    <AuthSessionProvider session={session}>
      <Box pt={60}>
        <LogIn session={session} location="/client" />
      </Box>
    </AuthSessionProvider>
  );
}

// export default Login;

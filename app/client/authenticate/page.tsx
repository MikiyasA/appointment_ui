import React from "react";
import { AuthSessionProvider } from "@/app/components/AuthSessionProvider";
import { Box } from "@mantine/core";
import { getServerSession } from "next-auth";
import LogIn from "../../components/LogIn";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  return (
    <AuthSessionProvider session={session}>
      <Box pt={60}>
        <LogIn session={session} location="/client" role="client" />
      </Box>
    </AuthSessionProvider>
  );
}

// export default Login;

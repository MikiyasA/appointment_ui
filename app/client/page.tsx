import { getServerSession } from "next-auth";
import { AuthSessionProvider } from "../components/AuthSessionProvider";
import { Box } from "@mantine/core";
import LogInOut from "../components/LogIn";
import { Suspense } from "react";
import Dashboard from "../components/client/Dashboard";
import { getData } from "../config/utils";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

interface PageProps {
  params: {
    clientId: string;
  };
}
export default async function ClientDashboard() {
  const session = await getServerSession(authOptions);
  const data = await getData(
    `appointment/findCurrentByClientId/${session?.userId}`,
  ); // when you use data on next component use(data), you can omit await here
  // TODO: all appointments findAllByClientId
  console.log({ data });
  return (
    <AuthSessionProvider session={session}>
      <Box pt={60}>
        {/* Suspense - for use hook and prevent waiting page from render */}
        {/* <Suspense> */}
        <Dashboard data={data} />
        {/* </Suspense> */}
      </Box>
    </AuthSessionProvider>
  );
}

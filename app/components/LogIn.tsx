"use client";
import {
  Container,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Text,
  Select,
} from "@mantine/core";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import classes from "@/app/styles/Login.module.css";
import { GoogleIcon } from "../client/GoogleIcon";
import { IconAlertTriangle, IconAt } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { DarkerColor } from "../config/color";
import { useRouter } from "next/navigation";

interface Props {
  session?: Session | null;
  location: "/client" | "/backOffice";
  role: "client" | "staff";
  inModal?: boolean;
}
const LogIn = ({ session, location, role, inModal }: Props) => {
  type Role = "client" | "staff";

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      email: "",
      password: "",
    },
  });
  const route = useRouter();
  if (session?.user) {
    route.push(location);
  }
  const handleSignIn = (userType: Role) => {
    document.cookie = `userType=${userType}; path=/`; // Set cookie before sign-in
    signIn("google", { callbackUrl: location });
  };
  const [loginRole, setRole] = useState<Role | null | any>(null);
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      {/* <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="a" href="/register" c={DarkerColor}>
          Create account
        </Anchor>
      </Text> */}
      <form>
        {/* onSubmit={() => handleSignIn("client")} method="POST" */}
        <Paper withBorder shadow="md" p="30px 15px" radius="md">
          {/* <TextInput
            label="Email"
            error="Invalid email"
            placeholder="Your Email"
            rightSection={<IconAt size={18} />}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps("password")}
          />
          <Group justify="space-between" mt="lg">
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group> */}
          {/* <Button
              color={DarkerColor}
              fullWidth
              mt="xl"
              type="submit"
              disabled={!form.isValid()}
            >
              Sign in
            </Button> */}
          <Group dir="column">
            {!inModal && (
              <Select
                w={"100%"}
                label="What is your role"
                data={["client", "staff"] as Role[]}
                onChange={setRole}
                required
              />
            )}
            <Button
              leftSection={<GoogleIcon />}
              variant="default"
              fullWidth
              onClick={() => handleSignIn(loginRole ?? role)}
              disabled={!loginRole && !inModal}
            >
              Continue with Google
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
  );
};

export default LogIn;

// <div style={{ paddingTop: 80 }}>
//   {session ? (
//     <>
//       <p>Welcome, {session.user?.name}</p>
//       <button onClick={() => signOut()}>Sign out</button>
//     </>
//   ) : (
//     <>
//       <button onClick={() => handleSignIn("client")}>
//         Sign in with Google
//       </button>
//       <p>Please sign in</p>
//     </>
//   )}
// </div>

// app/(protected)/unauthorized/page.tsx
import {
  Container,
  Card,
  Title,
  Text,
  Stack,
  ThemeIcon,
  rem,
  Center,
  Button,
  Group,
  Box,
} from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { DarkerColor, SecondaryColor } from "../config/color";

export default function UnauthorizedPage() {
  return (
    <Container
      size="xl"
      p={50}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        p={50}
        shadow="md"
        radius="md"
        withBorder
        role="alert"
        aria-labelledby="unauth-title"
      >
        <Stack align="center">
          <Center>
            <ThemeIcon
              size="80"
              radius="md"
              variant="light"
              color="red"
              aria-hidden
            >
              <IconLock size={60} />
            </ThemeIcon>
          </Center>

          <Box p={30} style={{ textAlign: "center" }}>
            <Title order={1} id="unauth-title">
              Unauthorized
            </Title>
            <Text size="lg" c="dimmed" mt={6}>
              You do not have permission to view this page.
            </Text>
            <Text size="lg" color="dimmed" mt={6}>
              If you believe this is an error, please contact support.
            </Text>
          </Box>

          <Group mt="md">
            <Link href="/login" passHref>
              <Button component="a" color={SecondaryColor} variant="filled">
                Log in
              </Button>
            </Link>

            <Link href="/" passHref>
              <Button component="a" color={DarkerColor} variant="subtle">
                Go Home
              </Button>
            </Link>
          </Group>

          <Text size="md" color="dimmed" mt="sm">
            Tip: If you're already logged in, try signing out and logging in
            with the correct account.
          </Text>
        </Stack>
      </Card>
    </Container>
  );
}

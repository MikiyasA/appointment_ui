"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ReactNode, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";

// Types
type ThemeName = "light" | "dark" | "green";

// Themes
const getTheme = (themeName: ThemeName) => {
  switch (themeName) {
    case "dark":
      return {
        colorScheme: "dark",
        primaryColor: "gray",
        fontFamily: "Inter, sans-serif",
        headings: { fontFamily: "Poppins, sans-serif" },
        defaultRadius: "md",
      };
    case "green":
      return {
        colorScheme: "light",
        primaryColor: "teal",
        fontFamily: "Inter, sans-serif",
        headings: { fontFamily: "Poppins, sans-serif" },
        defaultRadius: "md",
        components: {
          Button: {
            styles: {
              root: {
                fontWeight: 600,
                backgroundColor: "#20c997",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#12b886",
                },
              },
            },
          },
        },
      };
    case "light":
    default:
      return {
        colorScheme: "light",
        primaryColor: "blue",
        fontFamily: "Inter, sans-serif",
        headings: { fontFamily: "Poppins, sans-serif" },
        defaultRadius: "md",
      };
  }
};

export function Providers({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  return (
    <MantineProvider
      theme={getTheme(themeName)}
      //   withGlobalStyles
      //   withNormalizeCSS
    >
      <Notifications position="top-right" />
      <ThemeSwitcher setThemeName={setThemeName} />
      {children}
    </MantineProvider>
  );
}

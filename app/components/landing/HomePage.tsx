import { BackgroundImage, Box, Button, Group, Text } from "@mantine/core";
import React from "react";
import { CompanyName } from "../../config/names";
import { DarkerColor, PrimaryColor } from "../../config/color";
import Link from "next/link";
import { getData } from "@/app/config/utils";
import { Homepage } from "@/app/config/type";
import OpenModalIcon from "../OpenModalIcon";
import { IconEdit } from "@tabler/icons-react";
import { HomePageForms } from "@/app/back_office/manage_landing_page/LandingPageForms";

interface Props {
  location?: string;
}
const HomePage = async ({ location }: Props) => {
  const homepage: Homepage[] = await getData("findAllHomepage");
  console.log({ homepage });
  return (
    <Box id="home">
      <BackgroundImage
        src={homepage[0].homePicture || "/home-pic.png"}
        radius={"sm"}
        h={500}
      >
        <Box
          h={"100%"}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Box
            p={"40px 20px"}
            style={{
              background: `linear-gradient(180deg, ${DarkerColor}00, ${DarkerColor})`,
            }}
          >
            <Box m={20}>
              <Text c={"white"} fz={{ base: 35, sm: 50 }} fw={700}>
                GET EXPERT
              </Text>
              <Text c={"white"} fz={{ base: 35, sm: 50 }} fw={700}>
                ADVISE BY{" "}
                <Text span c={PrimaryColor} fz={{ base: 35, sm: 50 }} fw={700}>
                  {CompanyName}
                </Text>
              </Text>
              <Text
                c={PrimaryColor}
                fz={{ base: 15, sm: 30 }}
                fw={500}
                style={{
                  letterSpacing: 8,
                }}
              >
                ON ADDIS PROPERTIES
              </Text>
            </Box>
          </Box>
        </Box>
      </BackgroundImage>
      <Box px={30} py={10} bg={DarkerColor}>
        <Link href={"/client"}>
          <Button color={PrimaryColor} c={"black"}>
            Get Consulted
          </Button>
        </Link>
        <Group pt={20}>
          <OpenModalIcon
            location={location}
            iconText="Update Home Picture"
            color={PrimaryColor}
            children={<IconEdit size={40} />}
            modalChildren={<HomePageForms data={homepage[0]} />}
            size={30}
          />
        </Group>
      </Box>
    </Box>
  );
};

export default HomePage;

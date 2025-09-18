import {
  Box,
  Grid,
  GridCol,
  Text,
  Title,
  Image,
  Group,
  Card,
} from "@mantine/core";
import { title } from "process";
import React from "react";
import { DarkerColor, PrimaryColor } from "../../config/color";
import Link from "next/link";
import OpenModalButton from "../OpenModalButton";
import { DetailServicesForms } from "@/app/back_office/manage_landing_page/LandingPageForms";
import { getData } from "@/app/config/utils";
import { IconEdit } from "@tabler/icons-react";
import OpenModalIcon from "../OpenModalIcon";
// import Image from "next/image";

const Properties = async () => {
  const detailServicesO = [
    {
      image: "/building-1.png",
      title: "Modern 3-Bedroom Apartment in Bole",
      description:
        "Located in the heart of Bole, this spacious apartment features 3 bedrooms, 2 bathrooms, a balcony, and underground parking. Close to shopping malls and international schools.",
    },
    {
      image: "/building-2.png",
      title: "Commercial Office Space in Kazanchis",
      description:
        "A premium 200 m² office space in a secure business complex, ideal for startups and NGOs. Walking distance to hotels, banks, and UN offices.",
    },
    {
      image: "/building-3.png",
      title: "Luxury Villa in Old Airport",
      description:
        "This 5-bedroom villa includes a private garden, large kitchen, maid's room, and 24/7 security. Perfect for expat families or diplomatic housing.",
    },
  ];
  const detailServices = await getData("findAllDetailService");

  return (
    <Box p={30} bg={DarkerColor}>
      <OpenModalButton
        buttonText="Add Detail Service"
        location="back_office"
        color={PrimaryColor}
        children={<DetailServicesForms action="add" />}
      />
      <Grid grow>
        <GridCol span={{ lg: 8 }}>
          <Card bg={DarkerColor} p={0} c={"white"}>
            <Box style={{ position: "absolute", right: 10, top: 10 }}>
              <OpenModalIcon
                location={"back_office"}
                iconText="Update Detail Service"
                color={PrimaryColor}
                children={<IconEdit size={40} />}
                modalChildren={
                  <DetailServicesForms
                    action="update"
                    data={detailServices[0]}
                  />
                }
                size={30}
              />
            </Box>
            <Image radius={"md"} src={detailServices[0]?.image} />
            <Title order={6}>{detailServices[0]?.title}</Title>
            <Text>{detailServices[0]?.description}</Text>
          </Card>
        </GridCol>
        <GridCol span={{ lg: 4 }}>
          <Group justify="space-between" align="stretch">
            <Card bg={DarkerColor} p={0} c={"white"}>
              <Box style={{ position: "absolute", right: 10, top: 10 }}>
                <OpenModalIcon
                  location={"back_office"}
                  iconText="Update Detail Service"
                  color={PrimaryColor}
                  children={<IconEdit size={40} />}
                  modalChildren={
                    <DetailServicesForms
                      action="update"
                      data={detailServices[1]}
                    />
                  }
                  size={30}
                />
              </Box>
              <Box w={{ base: "45%", lg: "100%" }}>
                <Image radius={"md"} src={detailServices[1]?.image} />
                <Title order={6}>{detailServices[1]?.title}</Title>
                <Text>{detailServices[1]?.description}</Text>
              </Box>
            </Card>
            <Card bg={DarkerColor} p={0} c={"white"}>
              <Box style={{ position: "absolute", right: 10, top: 10 }}>
                <OpenModalIcon
                  location={"back_office"}
                  iconText="Update Detail Service"
                  color={PrimaryColor}
                  children={<IconEdit size={40} />}
                  modalChildren={
                    <DetailServicesForms
                      action="update"
                      data={detailServices[2]}
                    />
                  }
                  size={30}
                />
              </Box>
              <Box w={{ base: "45%", lg: "100%" }}>
                <Image radius={"md"} src={detailServices[2]?.image} />
                <Title order={6}>{detailServices[2]?.title}</Title>
                <Text>{detailServices[2]?.description}</Text>
              </Box>
            </Card>
          </Group>
        </GridCol>
        <Link href={"#"} color={PrimaryColor}>
          See More {">>"}
        </Link>
      </Grid>
    </Box>
  );
};

export default Properties;

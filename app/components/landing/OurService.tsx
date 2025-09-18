import {
  Box,
  Card,
  CardSection,
  Center,
  Group,
  SimpleGrid,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import React from "react";
import {
  DarkerColor,
  PrimaryColor,
  SecondaryColor,
  STextColor,
} from "../../config/color";
import {
  IconBuildingCommunity,
  IconHome2,
  IconMapPin,
  IconCirclePlus,
  IconEdit,
  IconArrowNarrowRightDashed,
} from "@tabler/icons-react";
import Properties from "./Properties";
import OpenModalIcon from "../OpenModalIcon";
import { OurServicesForms } from "@/app/back_office/manage_landing_page/LandingPageForms";
import { OurService } from "@/app/config/type";
import { getData } from "@/app/config/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  location?: string;
}
const OurServicePage = async ({ location }: Props) => {
  const services: OurService[] = await getData("findAllOurService");
  const servicesOld = [
    {
      title: "Property Advisory",
      icon: <IconHome2 size={60} />,
      description:
        "Expert guidance on buying, selling, and investing in residential and commercial properties.",
    },
    {
      title: "Location Analysis",
      icon: <IconMapPin size={60} />,
      description:
        "In-depth research and insights into neighborhood trends, pricing, and growth potential.",
    },
    {
      title: "Project Marketing",
      icon: <IconBuildingCommunity size={60} />,
      description:
        "Strategic marketing and branding services to help developers sell and lease new property projects.",
    },
  ];
  return (
    <Box bg={DarkerColor} id="service" p={30} style={{ color: "white" }}>
      <Group>
        <Title py={20} order={4}>
          Our Services
        </Title>
        <OpenModalIcon
          location={location}
          iconText="Add Service"
          color={PrimaryColor}
          children={<IconCirclePlus size={40} />}
          modalChildren={<OurServicesForms action="add" />}
          size={30}
        />
      </Group>
      <Box>
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          {services.map((p, i) => (
            <Card
              key={i}
              p={30}
              bg={SecondaryColor}
              style={{ alignItems: "center" }}
            >
              <Box style={{ position: "absolute", right: 10, top: 10 }}>
                <OpenModalIcon
                  location={location}
                  iconText="Update Service"
                  color={PrimaryColor}
                  children={<IconEdit size={40} />}
                  modalChildren={<OurServicesForms action="update" data={p} />}
                  size={30}
                />
              </Box>
              <CardSection p={10}>
                <Image src={p.icon} alt="" width={70} height={70} />
              </CardSection>
              <CardSection>
                <Title order={5}>{p.title}</Title>
              </CardSection>
              <CardSection>
                <Text>{p.description}</Text>
              </CardSection>
              {p.detail && (
                <Link
                  href={
                    location === "back_office"
                      ? `/back_office/manage_landing_page/our_service_detail/${p.id}`
                      : `/client/our_service_detail/${p.id}`
                  }
                  style={{ position: "absolute", right: 10, bottom: 10 }}
                >
                  <Tooltip label="See the detail">
                    <IconArrowNarrowRightDashed color={PrimaryColor} />
                  </Tooltip>
                </Link>
              )}
            </Card>
          ))}
        </SimpleGrid>
      </Box>
      <Properties />
    </Box>
  );
};

export default OurServicePage;

"use client";
import { Box, Card, Group, SimpleGrid, Text, Title } from "@mantine/core";
import React from "react";
import { DarkerColor, PrimaryColor, PTextColor } from "../../config/color";
import {
  IconBrandWhatsapp,
  IconDeviceLandlinePhone,
  IconDeviceMobile,
  IconEdit,
  IconMail,
  IconOctagonPlus,
} from "@tabler/icons-react";
import OpenModalIcon from "../OpenModalIcon";
import { SocialMediaDetailsForms } from "@/app/back_office/manage_landing_page/LandingPageForms";
import { SocialMedeaDetail } from "@/app/config/type";
import Image from "next/image";

interface Props {
  location?: string;
  data?: SocialMedeaDetail[];
}
const ContactUs = ({ data, location }: Props) => {
  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <Box p={30} bg={DarkerColor} id="contact_us">
      <Group>
        <Title order={4} c={"white"}>
          Contact Us
        </Title>
        <OpenModalIcon
          location={location}
          color={PrimaryColor}
          size={30}
          iconText="View Update Social Media Link"
          children={<IconOctagonPlus />}
          modalChildren={
            <SocialMediaDetailsForms action="add" position={"ContactUs"} />
          }
        />
      </Group>
      <SimpleGrid
        cols={{ base: 1, xs: 2, sm: 4 }}
        p={20}
        style={{ justifyItems: "center", textAlign: "center" }}
      >
        {data?.map((el, i) => (
          <Card bg={"transparent"} c={"white"} key={i}>
            <OpenModalIcon
              style={{ position: "absolute", right: 5, top: 5 }}
              location={location}
              color={PrimaryColor}
              size={30}
              iconText="Update Social Media Link"
              children={<IconEdit />}
              modalChildren={
                <SocialMediaDetailsForms
                  action="update"
                  position={"ContactUs"}
                  data={el}
                />
              }
            />
            <Box
              key={i}
              onClick={() => handleClick(el.link)}
              style={{ cursor: "pointer", justifyItems: "center" }}
            >
              <Image
                src={el.icon}
                width={100}
                height={100}
                alt={"el.name"}
                color="white"
              />
              <Text>{el.name}</Text>
              <Text>{el.link.split(/[:/]/).pop()}</Text>
            </Box>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ContactUs;

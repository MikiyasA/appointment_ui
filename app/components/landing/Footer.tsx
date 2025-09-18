"use client";
import { Box, Card, Group, Image, Text } from "@mantine/core";
import React from "react";
import { DarkerColor, FooterLBlack, PrimaryColor } from "../../config/color";
import { CompanyName } from "../../config/names";
import { SocialMedeaDetail } from "@/app/config/type";
import OpenModalIcon from "../OpenModalIcon";
import { IconEdit, IconEye, IconOctagonPlus } from "@tabler/icons-react";
import { SocialMediaDetailsForms } from "@/app/back_office/manage_landing_page/LandingPageForms";

interface Props {
  location?: string;
  data?: SocialMedeaDetail[];
}
const Footer = ({ data, location }: Props) => {
  const companyInfo = {
    email: "tilahun@yourrealestate.et",
    telephone: "+251111223344",
    mobile: "+251911223344",
    whatsApp: "251911223344",
    facebook: "",
    linkedin: "",
  };
  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <>
      {/* <Box p={30} bg={FooterLBlack}>
        <Text>
          <Text span fw={800}>
            {CompanyName}
          </Text>{" "}
          Property Consultancy PLC
        </Text>
        <Group>
          <Box w={"40%"}>
            <Text>Service 1</Text>
            <Text>Service 2</Text>
            <Text>Service 2</Text>
          </Box>
          <Box>
            <Text>{companyInfo.email}</Text>
            <Text>{companyInfo.telephone}</Text>
            <Text>{companyInfo.mobile}</Text>
          </Box>
        </Group>
      </Box> */}
      <Box bg={"black"}>
        <Group justify="space-between" p={3}>
          <Group mt="md" gap="lg" px={20}>
            {data?.map((el, i) => (
              <Box
                key={i}
                onClick={() => handleClick(el.link)}
                style={{ cursor: "pointer", justifyItems: "center" }}
              >
                <Image src={el.icon} alt={el.name} w={20} radius={"sm"} />
              </Box>
            ))}
            <OpenModalIcon
              location={location}
              color={PrimaryColor}
              size={30}
              iconText="View Update Social Media Link"
              children={<IconEye />}
              modalChildren={
                <>
                  {data?.map((el, i) => (
                    <SocialMediaDetailsForms
                      data={el}
                      action="update"
                      editable
                      position={"Footer"}
                    />
                  ))}
                </>
              }
            />
            <OpenModalIcon
              location={location}
              color={PrimaryColor}
              size={30}
              iconText="View Update Social Media Link"
              children={<IconOctagonPlus />}
              modalChildren={
                <SocialMediaDetailsForms action="add" position={"Footer"} />
              }
            />
          </Group>
          <Text>
            © {new Date().getFullYear()} {CompanyName} Property Consultancy PLC
          </Text>
        </Group>
      </Box>
    </>
  );
};

export default Footer;

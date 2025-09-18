"use client";
import { Box, Group, Text, Title, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import { DarkerColor, PrimaryColor } from "../../config/color";
import OpenModalIcon from "../OpenModalIcon";
import {
  IconEdit,
  IconEye,
  IconOctagonPlus,
  IconPlus,
} from "@tabler/icons-react";
import {
  AboutForms,
  SocialMediaDetailsForms,
} from "@/app/back_office/manage_landing_page/LandingPageForms";
import { getData } from "@/app/config/utils";
import { About } from "@/app/config/type";

interface Props {
  location?: string;
  data?: About[];
}
const AboutUs = ({ location, data }: Props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };
  const about = data?.[0];
  console.log({ about });
  return (
    <Box p={30} bg={DarkerColor} id="about_us" c={"white"}>
      <Group>
        <Title order={4}>About Us</Title>
        <OpenModalIcon
          location={location}
          iconText="Update About"
          color={PrimaryColor}
          children={<IconEdit size={40} />}
          modalChildren={<AboutForms data={about} />}
          size={30}
        />
      </Group>
      {!isMobile ? (
        <Group justify="space-around">
          <Box w={"50%"}>
            <Title order={4}>Meet {about?.name}</Title>
            <Text>{about?.description}</Text>
            <Group mt="md" gap="lg">
              {about?.socialMediaDetails?.map((el, i) => (
                <Box
                  key={i}
                  onClick={() => handleClick(`${el.link}`)}
                  style={{ cursor: "pointer" }}
                >
                  <Image src={el.icon} alt="WhatsApp" w={20} radius={"sm"} />
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
                    {about?.socialMediaDetails?.map((el, i) => (
                      <SocialMediaDetailsForms
                        data={el}
                        action="update"
                        editable
                        position={"AboutUs"}
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
                  <SocialMediaDetailsForms
                    action="add"
                    aboutId={about?.id}
                    position={"AboutUs"}
                  />
                }
              />
            </Group>
          </Box>
          <Box w={"45%"}>
            <Image src={about?.picture} radius={"lg"} maw={500} />
          </Box>
        </Group>
      ) : (
        <Box>
          <Group>
            <Image src={about?.picture} radius={"lg"} w={"45%"} />
            <Box>
              <Title order={4}>Meet</Title>
              <Title order={4}>{about?.name}</Title>
              <Group mt="md" gap="lg">
                {about?.socialMediaDetails?.map((el, i) => (
                  <Box
                    key={i}
                    onClick={() => handleClick(`${el.link}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <Image src={el.icon} alt="WhatsApp" w={20} radius={"sm"} />
                  </Box>
                ))}
              </Group>
            </Box>
          </Group>
          <Text>{about?.description}</Text>
        </Box>
      )}
    </Box>
  );
};

export default AboutUs;

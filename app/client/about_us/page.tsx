import AboutUs from "@/app/components/landing/AboutUs";
import { DarkerColor } from "@/app/config/color";
import { About, SocialMedeaDetail } from "@/app/config/type";
import { getData } from "@/app/config/utils";
import { Box } from "@mantine/core";
import React from "react";

const AboutUsPageC = async () => {
  const about: About[] = await getData("findAllAbout");

  return (
    <Box h={"100vh"} bg={DarkerColor}>
      <AboutUs data={about} />
    </Box>
  );
};

export default AboutUsPageC;

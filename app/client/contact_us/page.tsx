import ContactUs from "@/app/components/landing/ContactUs";
import { DarkerColor } from "@/app/config/color";
import { SocialMedeaDetail } from "@/app/config/type";
import { getData } from "@/app/config/utils";
import { Box } from "@mantine/core";
import React from "react";

const ContactUsPageC = async () => {
  const contacts: SocialMedeaDetail[] = await getData(
    "findAllSocialMedeaDetailByPosition/ContactUs"
  );
  return (
    <Box h={"100vh"} bg={DarkerColor}>
      <ContactUs data={contacts} />
    </Box>
  );
};

export default ContactUsPageC;

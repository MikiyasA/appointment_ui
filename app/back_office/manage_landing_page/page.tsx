import AboutUs from "@/app/components/landing/AboutUs";
import ContactUs from "@/app/components/landing/ContactUs";
import Footer from "@/app/components/landing/Footer";
import HomePage from "@/app/components/landing/HomePage";
import OurService from "@/app/components/landing/OurService";
import { About, SocialMedeaDetail } from "@/app/config/type";
import { getData } from "@/app/config/utils";
import { Box } from "@mantine/core";
import React from "react";

const ManageLandingPage = async () => {
  const about: About[] = await getData("findAllAbout");
  const contacts: SocialMedeaDetail[] = await getData(
    "findAllSocialMedeaDetailByPosition/ContactUs"
  );
  const contactsFooter: SocialMedeaDetail[] = await getData(
    "findAllSocialMedeaDetailByPosition/Footer"
  );

  return (
    <Box style={{ color: "white" }}>
      <HomePage location="back_office" />
      <OurService location="back_office" />
      <AboutUs location="back_office" data={about} />
      <ContactUs data={contacts} location="back_office" />
      <Footer data={contactsFooter} location="back_office" />
    </Box>
  );
};

export default ManageLandingPage;

import Image from "next/image";
import HomePage from "./components/landing/HomePage";
import OurService from "./components/landing/OurService";
import AboutUs from "./components/landing/AboutUs";
import ContactUs from "./components/landing/ContactUs";
import Footer from "./components/landing/Footer";
import { Box } from "@mantine/core";
import NavBar from "./components/landing/NavBar";
import { About, SocialMedeaDetail } from "./config/type";
import { getData } from "./config/utils";

export default async function Home() {
  const about: About[] = await getData("findAllAbout");
  const contacts: SocialMedeaDetail[] = await getData(
    "findAllSocialMedeaDetailByPosition/ContactUs"
  );
  const contactsFooter: SocialMedeaDetail[] = await getData(
    "findAllSocialMedeaDetailByPosition/Footer"
  );
  return (
    <Box style={{ color: "white" }}>
      <NavBar />
      <HomePage />
      <OurService />
      <AboutUs data={about} />
      <ContactUs data={contacts} />
      <Footer data={contactsFooter} />
    </Box>
  );
}

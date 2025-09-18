import { OurServicesForms } from "@/app/back_office/manage_landing_page/LandingPageForms";
import { SecondaryColor, PrimaryColor } from "@/app/config/color";
import { OurService } from "@/app/config/type";
import {
  Box,
  Card,
  CardSection,
  Center,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconArrowNarrowRightDashed } from "@tabler/icons-react";
import { Link } from "lucide-react";
import React from "react";
import OpenModalIcon from "../OpenModalIcon";
import Image from "next/image";

interface Props {
  data: OurService;
  location?: string;
}
const OurServiceDetail = ({ data, location }: Props) => {
  return (
    <Center>
      <Card p={30} style={{ alignItems: "center" }}>
        <Box style={{ position: "absolute", right: 10, top: 10 }}>
          <OpenModalIcon
            location={location}
            iconText="Update Service"
            color={PrimaryColor}
            children={<IconEdit size={40} />}
            modalChildren={<OurServicesForms action="update" data={data} />}
            size={30}
          />
        </Box>
        <CardSection p={10}>
          <Image src={data.icon} alt="" width={70} height={70} />
        </CardSection>
        <CardSection>
          <Title order={5}>{data.title}</Title>
        </CardSection>
        <CardSection>
          <Text>{data.description}</Text>
        </CardSection>
        <Box mt={30}>
          <hr />
          <Box maw={"90%"} mt={20}>
            <div dangerouslySetInnerHTML={{ __html: data?.detail as string }} />
          </Box>
        </Box>
      </Card>
    </Center>
  );
};

export default OurServiceDetail;

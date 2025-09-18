import {
  Anchor,
  Badge,
  Box,
  Card,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { formatDate, formatTime, getData } from "../config/utils";
import Link from "next/link";
import { Appointment } from "../config/type";
import Image from "next/image";
import {
  IconCircleCheck,
  IconCopyCheck,
  IconCopyCheckFilled,
  IconEdit,
  IconHelpOctagon,
  IconQuestionMark,
} from "@tabler/icons-react";
import { DarkerColor, PrimaryColor, SecondaryColor } from "../config/color";
import OpenModalIcon from "./OpenModalIcon";
import {
  AddUpdateCommentForm,
  AddUpdateGuestForm,
  UpdateAgentForm,
  UpdateStatusForm,
} from "./back_office/AppointmentForm";
import OpenModalButton from "./OpenModalButton";
import { statusBadgeFormatter } from "../config/jsx_utils";
import Questionnaires from "./back_office/Questionnaires";

interface Prop {
  data: Appointment;
  location?: string;
}
const AppointmentDetail = async ({ data, location }: Prop) => {
  const category = await getData("category/get_complete_questionnaire");

  return (
    <Box pb={50}>
      <Card shadow="sm" padding="lg" radius="md">
        <Text>Appointment Id: {data?.uniqueId}</Text>
        <Text>Date: {formatDate(data?.startTime)}</Text>
        <Text>From: {formatTime(data?.startTime)}</Text>
        <Text>To: {formatTime(data?.endTime)}</Text>
        <Text tt={"capitalize"}>
          Agent: {data?.agent?.staff.firstName} {data?.agent?.staff.lastName}
        </Text>
        <Text tt={"capitalize"}>
          Client: {data?.client?.firstName} {data?.client?.lastName}
        </Text>
        <Group gap={4}>
          Guests:
          {data?.guests?.map((el) => (
            <Badge color="gray" radius="sm">
              {el}
            </Badge>
          ))}
        </Group>
        <Text tt={"capitalize"}>
          Status: {statusBadgeFormatter(data?.status)}
        </Text>
        <Group>
          <Image src={"/google-meet.png"} alt="Meet" width={40} height={40} />
          <Anchor target="_blank" href={data?.meetingLink}>
            Click to Join Meeting
          </Anchor>
        </Group>
        <Group>
          <OpenModalButton
            buttonText="Update Agent"
            children={<UpdateAgentForm data={data} />}
            color={PrimaryColor}
            location={location}
          />
          <OpenModalButton
            buttonText="Update Status"
            children={<UpdateStatusForm data={data} />}
            color={SecondaryColor}
            location={location}
          />
          <OpenModalButton
            buttonText="Add/Update Guest"
            children={<AddUpdateGuestForm data={data} />}
            color={SecondaryColor}
            location={location}
          />
        </Group>
        <Box>
          <Card padding="lg" shadow="none">
            <hr style={{ marginBlock: 20 }} />
            <Group>
              <Title order={3} c={DarkerColor} mb={10}>
                Submitted Questionnaire
              </Title>
              <OpenModalIcon
                color={PrimaryColor}
                iconText="Update Questionnaire"
                size={30}
                location="back_office"
                modalChildren={
                  <Questionnaires
                    initialData={category}
                    questionnaireSnapshot={
                      data.questionnaire?.questionnaireSnapshot
                    }
                  />
                }
              >
                <IconQuestionMark />{" "}
              </OpenModalIcon>
            </Group>
            {data.questionnaire?.questionnaireSnapshot?.map((el, i) => (
              <Box key={i}>
                <Group>
                  <IconHelpOctagon color={SecondaryColor} />
                  <Text>{el.questionText}</Text>
                </Group>
                <Box ml={40}>
                  {el.selectedOptions.map((ans, i) => (
                    <Group key={i}>
                      <IconCircleCheck color={PrimaryColor} />
                      <Text>{ans.optionText}</Text>
                    </Group>
                  ))}
                  {el.otherText && (
                    <Group key={i}>
                      <IconCircleCheck color={PrimaryColor} />
                      <Text>{el.otherText}</Text>
                    </Group>
                  )}
                </Box>
              </Box>
            ))}
            <hr style={{ marginBlock: 20 }} />
            <Box>
              <Group>
                <Title order={3} c={DarkerColor} mb={10}>
                  Comments
                </Title>
                <OpenModalIcon
                  location={location}
                  iconText="Add/Update Comments"
                  color={PrimaryColor}
                  modalChildren={<AddUpdateCommentForm data={data} />}
                  size={"sm"}
                >
                  <IconEdit color={PrimaryColor} />
                </OpenModalIcon>
              </Group>
              <div
                dangerouslySetInnerHTML={{ __html: data?.comments as string }}
              />
            </Box>
          </Card>
        </Box>
      </Card>
    </Box>
  );
};

export default AppointmentDetail;

import { Badge, Center, Group } from "@mantine/core";
import { IconCircleCheck, IconXboxX } from "@tabler/icons-react";

export const activeLabel = (isActive: boolean) => {
  return (
    <Center>
      {isActive ? <IconCircleCheck color="green" /> : <IconXboxX color="red" />}
    </Center>
  );
};
export const badgeFormatter = (text: string) => {
  const color =
    text === "Active"
      ? "green"
      : text === "Inactive"
      ? "red"
      : text == "Auto-Added"
      ? "orange"
      : "gray"; // TODO: color as per choice
  return (
    <Badge radius={7} color={color} component="span">
      {text}
    </Badge>
  );
};
export const statusBadgeFormatter = (text: string) => {
  const color =
    text === "New"
      ? "orange"
      : text === "Confirmed"
      ? "green"
      : text == "Attended"
      ? "teal"
      : text == "Closed"
      ? "cyan"
      : "gray";
  return (
    <Badge radius={7} color={color} component="span">
      {text}
    </Badge>
  );
};
export const listStringFormatter = (rolls: string[]) => {
  const badgeColors = [
    "blue",
    "cyan",
    "green",
    "grape",
    "indigo",
    "lime",
    "orange",
    "pink",
    "red",
    "teal",
    "violet",
  ];

  // Utility to get a random color
  const getRandomColor = () => {
    return badgeColors[Math.floor(Math.random() * badgeColors.length)];
  };
  return (
    <Group gap={3}>
      {rolls.map((el, i) => (
        <Badge
          key={i}
          radius={7}
          variant="outline"
          color={getRandomColor()}
          component="span"
        >
          {el}
        </Badge>
      ))}
    </Group>
  );
};

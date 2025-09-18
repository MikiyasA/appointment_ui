"use client";
import { SecondaryColor, PrimaryColor, DarkerColor } from "@/app/config/color";
import { Category, QuestionnaireSnapshotItem } from "@/app/config/type";
import { getData } from "@/app/config/utils";
import {
  Box,
  Card,
  Group,
  Title,
  Checkbox,
  RadioGroup,
  Radio,
  Text,
  TextInput,
  Button,
} from "@mantine/core";
import {
  IconCategoryMinus,
  IconMessagePlus,
  IconMessage2Check,
  IconListCheck,
  IconPencilCheck,
} from "@tabler/icons-react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton";
import OpenModalIcon from "../OpenModalIcon";
import { CategoryForm, OptionForm, QuestionForm } from "./QuestionnaireForm";
import { useSession } from "next-auth/react";
import { useApi } from "@/app/config/useApi";
import { useRouter } from "next/navigation";

type Props = {
  initialData: Category[];
  location?: string;
  selectedStartTime?: Date | null | undefined;
  setFormPlace?: Dispatch<SetStateAction<string | null>>;
  questionnaireSnapshot?: QuestionnaireSnapshotItem[];
};
const Questionnaires = ({
  initialData,
  location,
  selectedStartTime,
  setFormPlace,
  questionnaireSnapshot,
}: Props) => {
  const { data: session } = useSession();

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const [data, setData] = useState<Category[]>(initialData);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [otherMap, setOtherMap] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      initialData.flatMap(
        (cat) => cat.question?.map((q) => [q.id, false]) ?? []
      )
    )
  );
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string[]>
  >({});
  const [otherTextMap, setOtherTextMap] = useState<Record<string, string>>({});
  const [selectedOptionMap, setSelectedOptionMap] = useState<
    Record<string, string>
  >({});

  const answerSnapshot = Object.keys(selectedAnswers).map((questionId) => ({
    questionId,
    selectedOptionIds: selectedAnswers[questionId],
    otherText: otherMap[questionId] ? otherTextMap[questionId] ?? "" : "",
  }));

  const payload = {
    answerSnapshot,
    clientId: session?.userId,
    accessToken: session?.accessToken,
    startTime: selectedStartTime,
  };

  const { loading, success, status, fetchPost } = useApi();
  const { push } = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await fetchPost(
      "client_request/with_appointment",
      payload,
      "POST"
    );
    if (status === 201) {
      push("/client");
    }
  };

  useEffect(() => {
    const fetchUpdatedData = async () => {
      const updated = await getData(
        "category/get_complete_with_archived_questionnaire"
      );
      setData(updated);
    };
    if (refreshFlag > 0) {
      fetchUpdatedData();
    }
  }, [refreshFlag]);

  // to update the questionnaire
  useEffect(() => {
    if (!questionnaireSnapshot || !data) return;

    const newSelectedAnswers: Record<string, string[]> = {};
    const newSelectedOptionMap: Record<string, string> = {};
    const newOtherTextMap: Record<string, string> = {};
    const newOtherMap: Record<string, boolean> = {};

    questionnaireSnapshot.forEach((item) => {
      const { questionId, multiAnswer, selectedOptions } = item;

      const allOptionIds =
        data
          .flatMap((cat) => cat.question || [])
          .find((q) => q.id === questionId)
          ?.answer?.map((opt) => opt.id) || [];

      const selectedIds = selectedOptions.map((opt) => opt.optionId);

      const matchedIds = selectedIds.filter((id) => allOptionIds.includes(id));
      const otherOption = selectedOptions.find(
        (opt) => !allOptionIds.includes(opt.optionId)
      );

      // Set main answers
      if (multiAnswer) {
        newSelectedAnswers[questionId] = matchedIds;
      } else if (matchedIds.length > 0) {
        newSelectedAnswers[questionId] = [matchedIds[0]];
        newSelectedOptionMap[questionId] = matchedIds[0];
      }

      // Set 'Other'
      if (otherOption) {
        newOtherMap[questionId] = true;
        newOtherTextMap[questionId] = otherOption.optionText ?? "";
      }
    });

    setSelectedAnswers(newSelectedAnswers);
    setSelectedOptionMap(newSelectedOptionMap);
    setOtherTextMap(newOtherTextMap);
    setOtherMap(newOtherMap);
  }, [questionnaireSnapshot, data]);

  return (
    <Box>
      <OpenModalButton
        buttonText="Add Category"
        color={SecondaryColor}
        children={<CategoryForm action="add" />}
        location={location}
      />
      <Card
        shadow={location === "backOffice" ? "md" : "none"}
        withBorder={location === "backOffice"}
      >
        {data?.map((cat, i) => (
          <Box key={i}>
            <Box>
              <Group>
                <Title
                  order={4}
                  tt={"capitalize"}
                  pt={15}
                  c={cat.isArchived ? "red" : SecondaryColor}
                  style={{
                    textDecorationLine: cat.isArchived ? "line-through" : "",
                  }}
                >
                  {cat.title}
                </Title>
                <OpenModalIcon
                  location={location}
                  iconText="Update Category"
                  color={PrimaryColor}
                  modalChildren={
                    <CategoryForm
                      action="update"
                      formData={cat}
                      onSuccess={() => setRefreshFlag((p) => p + 1)}
                    />
                  }
                  size={"sm"}
                >
                  <IconCategoryMinus />
                </OpenModalIcon>
                <OpenModalIcon
                  location={location}
                  iconText="Add Question"
                  color={DarkerColor}
                  modalChildren={
                    <QuestionForm
                      action="add"
                      categoryId={cat.id}
                      onSuccess={() => setRefreshFlag((p) => p + 1)}
                    />
                  }
                  size={"sm"}
                >
                  <IconMessagePlus />
                </OpenModalIcon>
              </Group>
              <Text
                size="xs"
                c={cat.isArchived ? "red" : ""}
                style={{
                  textDecorationLine: cat.isArchived ? "line-through" : "",
                }}
              >
                {cat.description}
              </Text>
              {cat.question?.map((que, i) => (
                <Box key={`que${i}`}>
                  <Group>
                    <Text
                      mt={5}
                      c={cat.isArchived || que.isArchived ? "red" : ""}
                      style={{
                        textDecorationLine:
                          cat.isArchived || que.isArchived
                            ? "line-through"
                            : "",
                      }}
                    >{`${i + 1}-${que.text}`}</Text>
                    <OpenModalIcon
                      location={location}
                      iconText="Update Question"
                      color={PrimaryColor}
                      modalChildren={
                        <QuestionForm
                          action="update"
                          formData={que}
                          onSuccess={() => setRefreshFlag((p) => p + 1)}
                        />
                      }
                      size={"sm"}
                    >
                      <IconMessage2Check />
                    </OpenModalIcon>
                    <OpenModalIcon
                      location={location}
                      iconText="Add Answer"
                      color={DarkerColor}
                      modalChildren={
                        <OptionForm
                          action="add"
                          questionId={que.id}
                          onSuccess={() => setRefreshFlag((p) => p + 1)}
                        />
                      }
                      size={"sm"}
                    >
                      <IconListCheck />
                    </OpenModalIcon>
                  </Group>
                  {que.multiAnswer ? (
                    <Box>
                      {que?.answer?.map((ans, i) => (
                        <Group key={`ansC${i}`}>
                          <Checkbox
                            p={5}
                            size="xs"
                            label={ans.text}
                            value={ans.id}
                            disabled={
                              cat.isArchived || que.isArchived || ans.isArchived
                            }
                            c={ans.isArchived ? "red" : ""}
                            style={{
                              textDecorationLine: ans.isArchived
                                ? "line-through"
                                : "",
                            }}
                            checked={
                              selectedAnswers[que.id]?.includes(ans.id) ?? false
                            }
                            onChange={(e) => {
                              const checked = e.currentTarget.checked;
                              setSelectedAnswers((prev) => {
                                const current = prev[que.id] ?? [];
                                return {
                                  ...prev,
                                  [que.id]: checked
                                    ? [...current, ans.id]
                                    : current.filter((id) => id !== ans.id),
                                };
                              });
                            }}
                          />
                          <OpenModalIcon
                            location={location}
                            iconText="Update Answer11"
                            color={PrimaryColor}
                            modalChildren={
                              <OptionForm
                                action="update"
                                formData={ans}
                                onSuccess={() => setRefreshFlag((p) => p + 1)}
                              />
                            }
                            size={"sm"}
                          >
                            <IconPencilCheck />
                          </OpenModalIcon>
                        </Group>
                      ))}
                      {que?.otherAllowed && (
                        <Checkbox
                          p={5}
                          size="xs"
                          label="Other"
                          checked={otherMap[que.id] ?? false}
                          onChange={() =>
                            setOtherMap((prev) => ({
                              ...prev,
                              [que.id]: !prev[que.id],
                            }))
                          }
                        />
                      )}

                      {hydrated && otherMap[que.id] && (
                        <TextInput
                          label="Provide your own answer"
                          placeholder="Type your custom answer here..."
                          value={
                            typeof otherTextMap[que.id] === "string"
                              ? otherTextMap[que.id]
                              : ""
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const newVal = e.currentTarget.value;
                            setOtherTextMap((prev) => {
                              const copy = { ...prev, [que.id]: newVal };
                              return copy;
                            });
                          }}
                        />
                      )}
                    </Box>
                  ) : (
                    <Box>
                      <RadioGroup
                        value={selectedOptionMap[que.id] || ""}
                        onChange={(value) => {
                          setSelectedOptionMap((prev) => ({
                            ...prev,
                            [que.id]: value,
                          }));

                          if (value === "other") {
                            setOtherMap((prev) => ({
                              ...prev,
                              [que.id]: true,
                            }));

                            // Empty selected answers when "Other" is chosen
                            setSelectedAnswers((prev) => ({
                              ...prev,
                              [que.id]: [],
                            }));
                          } else {
                            setOtherMap((prev) => ({
                              ...prev,
                              [que.id]: false,
                            }));

                            setSelectedAnswers((prev) => ({
                              ...prev,
                              [que.id]: [value], // Set the selected answer ID
                            }));
                          }
                        }}
                      >
                        {que?.answer?.map((ans, i) => (
                          <Group key={`ansR${i}`}>
                            <Radio
                              p={5}
                              size="xs"
                              label={ans.text}
                              value={ans.id}
                              disabled={cat.isArchived}
                              c={ans.isArchived ? "red" : ""}
                              style={{
                                textDecorationLine: ans.isArchived
                                  ? "line-through"
                                  : "",
                              }}
                            />
                            <OpenModalIcon
                              location={location}
                              iconText="Update Answer"
                              color={PrimaryColor}
                              modalChildren={
                                <OptionForm
                                  action="update"
                                  formData={ans}
                                  onSuccess={() => setRefreshFlag((p) => p + 1)}
                                />
                              }
                              size={"sm"}
                            >
                              <IconPencilCheck />
                            </OpenModalIcon>
                          </Group>
                        ))}
                        {que?.otherAllowed && (
                          <Radio p={5} size="xs" label="Other" value="other" />
                        )}
                      </RadioGroup>
                      {hydrated && otherMap[que.id] && (
                        <TextInput
                          label="Provide your own answer"
                          placeholder="Type your custom answer here..."
                          value={
                            typeof otherTextMap[que.id] === "string"
                              ? otherTextMap[que.id]
                              : ""
                          }
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const newVal = e.currentTarget?.value;
                            setOtherTextMap((prev) => {
                              const copy = { ...prev, [que.id]: newVal };
                              return copy; // TODO: Update questionnaire
                            });
                          }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Card>
      {location !== "back_office" && (
        <Group>
          <Button
            color={DarkerColor}
            variant="subtle"
            onClick={() => {
              if (setFormPlace) {
                setFormPlace("calendar");
              }
            }}
          >
            Back
          </Button>
          <form onSubmit={handleSubmit}>
            <Button color={DarkerColor} type="submit" loading={loading}>
              Submit
            </Button>
          </form>
        </Group>
      )}
    </Box>
  );
};

export default Questionnaires;

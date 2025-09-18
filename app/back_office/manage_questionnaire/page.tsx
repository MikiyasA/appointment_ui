import { CategoryForm } from "@/app/components/back_office/QuestionnaireForm";
import Questionnaires from "@/app/components/back_office/Questionnaires";
import { Category } from "@/app/config/type";
import { getData } from "@/app/config/utils";
import { Box, Center } from "@mantine/core";

import React from "react";

const ManageQuestionnaire = async () => {
  const data: Category[] = await getData(
    "category/get_complete_with_archived_questionnaire"
  );
  return (
    <Box>
      <Center pt={10} pb={40}>
        <Questionnaires initialData={data} location="back_office" />
      </Center>
    </Box>
  );
};

export default ManageQuestionnaire;

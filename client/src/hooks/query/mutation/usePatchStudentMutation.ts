import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAStudent } from "../../fetchApi/updateAStudent";
import { ParamsType } from "../../../types/MutationParams";

export const updateStudentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: ParamsType) => updateAStudent(params.studentData, params.token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["students"]);
      },
    }
  );
};

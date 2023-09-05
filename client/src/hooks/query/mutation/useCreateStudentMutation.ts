import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "../../fetchApi/createStudent";
import { ParamsType } from "../../../types/MutationParams";

export const createStudentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: ParamsType) => createStudent(params.studentData, params.token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["students"]);
      },
    }
  );
};

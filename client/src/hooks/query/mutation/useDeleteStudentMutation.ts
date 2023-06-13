import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAStudent } from "../../fetchApi/deleteAStudent";
type ParamsType = {
  id: string;
  token: string;
};

export const deleteStudentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: ParamsType) => deleteAStudent(params.id, params.token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["students"]);
      },
    }
  );
};

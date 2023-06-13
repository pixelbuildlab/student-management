import { getStudents } from "../fetchApi/getStudents";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentsQuery = (
  userId: string,
  token: string,
  fetchState: boolean,
  authState: boolean
) => {
  return useQuery<any>(
    ["students", userId, token],
    () => getStudents(userId, token),
    {
      enabled: fetchState && authState,
    }
  );
};

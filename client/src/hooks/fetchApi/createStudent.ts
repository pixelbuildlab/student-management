import axios from "axios";
import { StudentData } from "../../types/Students";
import { instance } from "./useFetchApiConfig";

export const createStudent = async (data: StudentData, token: string) => {
  try {
    const response = await instance.post("students", data, {
      headers: {
        token,
      },
    });
    return response.statusText;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
      return error;
    } else {
      console.error(error);
      return error;
    }
  }
};

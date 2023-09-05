import axios from "axios";
import { StudentData } from "../../types/Students";
import { instance } from "./useFetchApiConfig";

export const updateAStudent = async (data: StudentData, token: string) => {
  const id = data._id;
  delete data._id;
  try {
    const response = await instance.patch(`/students/${id}`, data, {
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

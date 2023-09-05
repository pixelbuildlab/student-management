import axios from "axios";
import { instance } from "./useFetchApiConfig";

export const deleteAStudent = async (_id: any, token: string) => {
  try {
    const response = await instance.delete(`/students/${_id}`, {
      headers: {
        token,
      },
    });
    return response.statusText;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.status);
      console.error(error.response);
    } else {
      console.error(error);
    }
  }
};

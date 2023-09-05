import axios from "axios";
import { instance } from "./useFetchApiConfig";

export const getStudents = async (id: string, jwtTk: string) => {
  try {
    // console.log(jwtTk);
    const response = await instance.get("students", {
      headers: {
        uid: id,
        token: jwtTk,
      },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
      let errorContainer: any[] = [];
      errorContainer.push(error);
    } else {
      console.error(error);
      return error;
    }
  }
};

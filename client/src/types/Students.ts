import { Dayjs } from "dayjs";

export type StudentData = {
  _id?: string;
  fullName: string;
  gender: string;
  city: string;
  dob: Dayjs | null;
  groups: string[];
  userId?: string;
};

import { Dayjs } from "dayjs";

export type DatePickerProps = {
  value: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
};

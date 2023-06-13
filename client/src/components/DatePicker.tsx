import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DatePickerProps } from "../types/DatePickerProps";

export default function DatePickerValue({ value, onChange }: DatePickerProps) {
  const date = dayjs(value);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        minDate={dayjs("1990-01-01")}
        maxDate={dayjs("2022-12-31")}
        label="Date of Birth"
        value={date}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}

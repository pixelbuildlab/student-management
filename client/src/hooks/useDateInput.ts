import { Dayjs } from "dayjs";
import { useState } from "react";

const useDateInput = (initialValue: Dayjs | null) => {
  const [value, setValue] = useState(initialValue);

  const handleDateChange = (newDate: Dayjs | null) => {
    setValue(newDate);
  };
  return {
    value,
    onDateChange: handleDateChange,
    setValue,
  };
};
export default useDateInput;

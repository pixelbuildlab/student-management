import { useState } from "react";

const useGroupsInput = (initialValue: string[]) => {
  const [value, setValue] = useState(initialValue);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setValue((prevGroups) => {
      if (prevGroups.includes(value)) {
        return prevGroups.filter((group) => group !== value);
      } else {
        return [...prevGroups, value];
      }
    });
  };
  return {
    value,
    onCheckboxChange: handleCheckboxChange,
    setValue,
  };
};
export default useGroupsInput;

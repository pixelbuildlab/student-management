import { useState } from "react";

const useInput = (
  initialValue: string,
  validatefn?: (value: string) => string
) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    setError(validatefn ? validatefn(inputValue) : "");
  };

  return {
    value,
    error,
    onChange: handleChange,
    setValue,
  };
};
export default useInput;

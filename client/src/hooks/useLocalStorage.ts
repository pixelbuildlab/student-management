import { useState, useEffect } from "react";

const useLocalStorage = (name: string): string => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(localStorage.getItem(name) || "");
  });

  return value;
};

export default useLocalStorage;

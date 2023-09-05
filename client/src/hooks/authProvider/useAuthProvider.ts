import { useEffect } from "react";
import { useState } from "react";
import useLocalStorage from "../useLocalStorage";
const useAuthProvider = (localStorageItem: string, authSate: boolean) => {
  const authData = useLocalStorage(localStorageItem);
  const [isAuth, setAuth] = useState(authSate);
  const jsonAuthData = authData !== "" ? JSON.parse(authData) : null;
  useEffect(() => {
    setAuth(jsonAuthData !== null);
  }, [jsonAuthData]);
  return {
    jsonAuthData,
    isAuth,
  };
};

export default useAuthProvider;

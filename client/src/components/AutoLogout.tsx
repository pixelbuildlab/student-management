import { useEffect } from "react";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];
type appLogoutProps = {
  children: JSX.Element;
  isAuth: any;
};
function AppLogout({ children, isAuth }: appLogoutProps) {
  // const router = useRouter;
  let timer: NodeJS.Timeout;

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      resetTimer();
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      logoutAction();
    }, 30000);
  };

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);

  const logoutAction = () => {
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  if (isAuth === null) {
    logoutAction();
  }
  return children;
}

export default AppLogout;

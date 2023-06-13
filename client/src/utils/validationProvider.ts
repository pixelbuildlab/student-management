export const validateNameCityInput = (value: string) => {
  const regex = /^[a-zA-Z '.-]{1,30}$/;
  return regex.test(value) ? "" : "Non empty valid input required";
};
export const validateEmailInput = (value: string) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(value) ? "" : "Please Provide Non-empty valid email";
};
export const validatePasswordInput = (value: string) => {
  const regex = /^(?=.*\d)(?=.*[a-zA-Z]).{7,}$/;
  return regex.test(value) ? "" : "Password must have a number and length 6";
};

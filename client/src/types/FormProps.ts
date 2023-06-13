import { StudentData } from "./Students";

export type FormProps = {
  addStudentHandler: (data: StudentData) => void;
  onClose: () => void;
  isUpdate: boolean;
  updateStudent: StudentData;
};

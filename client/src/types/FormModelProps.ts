import { StudentData } from "./Students";

export type FormModelProps = {
  isUpdate: boolean;
  openForm: boolean;
  handleClose: () => void;
  addStudentHandler: (data: StudentData) => Promise<void>;
  updateStudent: StudentData;
};

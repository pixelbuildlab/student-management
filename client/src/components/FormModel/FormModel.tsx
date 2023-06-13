import BasicModal from "../Model/Model";
import Form from "../Form";
import { FormModelProps } from "../../types/FormModelProps";

function FormModel({
  openForm,
  handleClose,
  addStudentHandler,
  isUpdate,
  updateStudent,
}: FormModelProps) {
  return (
    <BasicModal open={openForm} onClose={handleClose}>
      <Form
        addStudentHandler={addStudentHandler}
        onClose={handleClose}
        isUpdate={isUpdate}
        updateStudent={updateStudent}
      />
    </BasicModal>
  );
}

export default FormModel;

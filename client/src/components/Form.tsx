import { useState } from "react";
import {
  TextField,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Checkbox,
  Button,
} from "@mui/material";
import DatePickerValue from "./DatePicker";
import GROUPLIST from "../constants/groups";
import useInput from "../hooks/useInput";
import { StudentData } from "../types/Students";
import useGroupsInput from "../hooks/useGroupsInput";
import useDateInput from "../hooks/useDateInput";
import dayjs, { Dayjs } from "dayjs";
import { FormProps } from "../types/FormProps";
import { validateNameCityInput } from "../utils/validationProvider";

function Form({
  isUpdate,
  updateStudent,
  addStudentHandler,
  onClose,
}: FormProps) {
  let title = "Student Details";
  let submitText = "Submit";
  const fullName = useInput("", validateNameCityInput);
  const cityName = useInput("", validateNameCityInput);
  const selectedGroups = useGroupsInput([]);
  const formdate: Dayjs | null = dayjs("2021.02.17");
  const date = useDateInput(formdate);
  const gender = useInput("Male");
  const [isFilled, setIsFilled] = useState({ name: false, city: false });
  const [isFirst, setIsFirst] = useState(true);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      return;
    } else if (fullName.value.length === 0 || cityName.value.length === 0) {
      return;
    }

    let data: StudentData = {
      fullName: fullName.value.trim(),
      gender: gender.value,
      city: cityName.value.trim(),
      dob: date.value,
      groups: selectedGroups.value,
    };

    if (isUpdate) {
      data = {
        ...data,
        _id: updateStudent._id,
      };
    }

    addStudentHandler(data);
    resetForm();
    fullName.setValue("");
    cityName.setValue("");
  };

  const validateForm = () => {
    return fullName.error.length !== 0 || cityName.error.length !== 0;
  };

  let isFormValid = validateForm();
  // console.log(isFormValid);
  const resetForm = () => {
    fullName.setValue("");
    cityName.setValue("");
    selectedGroups.setValue([]);
    date.setValue(formdate);
    gender.setValue("Male");
    setIsFilled({ name: false, city: false });
  };

  if (!isUpdate) {
    title = "Add New Student";
  } else {
    title = "Update Student Details";
    const setForm = () => {
      fullName.setValue(updateStudent.fullName);
      cityName.setValue(updateStudent.city);
      selectedGroups.setValue(updateStudent.groups);
      date.setValue(updateStudent.dob);
      gender.setValue(updateStudent.gender);
    };
    submitText = "Update";
    if (isFirst) {
      setForm();
      setIsFirst(false);
      setIsFilled({ name: true, city: true });
    }
  }

  return (
    <Box>
      <Button
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 20,
          top: 25,
          color: "red",
          fontSize: 30,
        }}
      >
        x
      </Button>
      <form onSubmit={submitHandler}>
        <Typography
          variant="h4"
          sx={{ color: "black", mb: 3, fontWeight: 600 }}
        >
          {title}
        </Typography>
        <TextField
          label="Full Name"
          variant="outlined"
          error={fullName.error !== ""}
          helperText={fullName.error}
          onBlur={(e) => {
            if (e.target.value.length !== 0) {
              setIsFilled({ ...isFilled, name: true });
            }
          }}
          sx={{ mb: 3 }}
          value={fullName.value}
          onChange={fullName.onChange}
          fullWidth
        />
        <Typography variant="body1" sx={{ color: "black" }}>
          Select groups
        </Typography>
        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          {GROUPLIST.map((option) => (
            <FormControlLabel
              key={option.id}
              control={
                <Checkbox
                  color="error"
                  value={option.id}
                  checked={selectedGroups.value.includes(option.id)}
                  onChange={selectedGroups.onCheckboxChange}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
        <br />
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            aria-labelledby="select-gender"
            name="gender-selector"
            value={gender.value}
            onChange={gender.onChange}
          >
            <FormControlLabel
              value="Female"
              control={<Radio color="error" />}
              label="Female"
            />
            <FormControlLabel
              value="Male"
              control={<Radio color="error" />}
              label="Male"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Place Of Birth"
          variant="outlined"
          sx={{ my: 3 }}
          error={cityName.error !== ""}
          helperText={cityName.error}
          fullWidth
          onBlur={(e) => {
            if (e.target.value.length !== 0) {
              setIsFilled({ ...isFilled, city: true });
            }
          }}
          value={cityName.value}
          onChange={cityName.onChange}
        />
        <DatePickerValue value={date.value} onChange={date.onDateChange} />
        <br />
        <Button
          variant="contained"
          disableElevation
          size="large"
          type="submit"
          disabled={!isFilled.city || !isFilled.name || isFormValid}
          sx={{ bgcolor: "green", color: "white", mt: 3 }}
        >
          {submitText}
        </Button>
        <Button
          variant="contained"
          disableElevation
          size="large"
          type="reset"
          onClick={resetForm}
          sx={{ bgcolor: "red", color: "white", mt: 3, ml: 5 }}
        >
          Clear
        </Button>
      </form>
    </Box>
  );
}

export default Form;

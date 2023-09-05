import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import FilterPanel from "./FilterPanel";
import StudentTable from "./TablePanel";
import dayjs from "dayjs";
import useGroupsInput from "../hooks/useGroupsInput";
import { StudentData as StudentDataType } from "../types/Students";
import Spinner from "./Spinner/Spinner";
import { createStudentMutation } from "../hooks/query/mutation/useCreateStudentMutation";
import { deleteStudentMutation } from "../hooks/query/mutation/useDeleteStudentMutation";
import { updateStudentMutation } from "../hooks/query/mutation/usePatchStudentMutation";
import Head from "next/head";
import FormModel from "./FormModel/FormModel";
import AppLogout from "./AutoLogout";
import ErrorPage from "./ErrorPage";
import { useGetStudentsQuery } from "../hooks/query/useGetStudentsQuery";
import useAuthProvider from "../hooks/authProvider/useAuthProvider";

function DashboardUi() {
  const [fetchStudents, setFetchStudents] = useState(false);

  const { isAuth, jsonAuthData } = useAuthProvider("userData", false);

  useEffect(() => {
    setFetchStudents(true);
  }, []);

  const { isLoading, isError, data } = useGetStudentsQuery(
    jsonAuthData?.userId,
    jsonAuthData?.token,
    fetchStudents,
    isAuth
  );
  const allStudents = React.useMemo(() => data || [], [data]);

  const [updateStudent, setUpdateStudent] = useState<StudentDataType>({
    fullName: "",
    gender: "",
    city: "",
    dob: dayjs(""),
    groups: [],
    userId: "",
  });

  const addStudentMutation = createStudentMutation();
  const deleteMutation = deleteStudentMutation();
  const updateMutation = updateStudentMutation();

  const checkedGroup = useGroupsInput([]);

  const [openForm, setOpenFrom] = useState(false);
  const handleFormOpen = () => setOpenFrom(true);
  const handleFormClose = () => {
    setIsUpdate(false);
    setOpenFrom(false);
  };

  const [isUpdate, setIsUpdate] = useState(false);

  const [filteredData, setFilteredData] = useState(allStudents);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const searchedData = allStudents.filter((student: StudentDataType) =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (checkedGroup.value.length !== 0) {
      const filtered = searchedData.filter((student: StudentDataType) =>
        checkedGroup.value.every((group) => student.groups.includes(group))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(searchedData);
    }
  }, [searchTerm, allStudents, checkedGroup.value]);

  if ((isLoading || !isAuth) && jsonAuthData !== null) {
    return (
      <AppLogout isAuth={isAuth}>
        <Spinner state={true} />
      </AppLogout>
    );
  }
  if (
    !isAuth || isError || data?.response?.status
      ? true
      : false ||
        addStudentMutation.isError ||
        deleteMutation.isError ||
        updateMutation.isError
  ) {
    return <ErrorPage />;
  }
  const addStudent = async (studentData: StudentDataType) => {
    const userId = jsonAuthData?.userId;
    studentData = { ...studentData, userId };
    studentData._id === undefined
      ? addStudentMutation.mutate({ studentData, token: jsonAuthData?.token })
      : updateMutation.mutate({ studentData, token: jsonAuthData?.token });

    handleFormClose();
  };

  const deleteHanlder = async (id: string) => {
    deleteMutation.mutate({ id, token: jsonAuthData?.token });
  };

  return (
    <AppLogout isAuth={isAuth}>
      <>
        <Head>
          <title>Student Management Dashboard</title>
          <meta
            property="og:title"
            content="Student Management Dashboard"
            key="title"
          />
        </Head>
        <Box
          sx={{
            marginTop: "10rem",
            marginX: "3rem",
            bgcolor: "white",
            p: "2rem",
          }}
        >
          <Header
            studentCount={allStudents.length}
            handleSearchTextChange={handleSearchTextChange}
            value={searchTerm}
            handleOpen={handleFormOpen}
          />
          <div
            style={{
              height: "1px",
              backgroundColor: "#a1adb3",
              marginTop: "30px",
            }}
          />

          <FormModel
            openForm={openForm}
            handleClose={handleFormClose}
            isUpdate={isUpdate}
            updateStudent={updateStudent}
            addStudentHandler={addStudent}
          />

          <Box sx={{ display: "flex", gap: 10, pt: "2rem" }}>
            <FilterPanel
              value={checkedGroup.value}
              onChange={checkedGroup.onCheckboxChange}
            />
            <StudentTable
              rows={filteredData}
              onDelete={deleteHanlder}
              handleOpen={handleFormOpen}
              updateFn={async (data: StudentDataType) => {
                setIsUpdate(true);
                setUpdateStudent(data);
              }}
            />
          </Box>
        </Box>
      </>
    </AppLogout>
  );
}

export default DashboardUi;

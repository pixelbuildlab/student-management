import { ObjectId } from "bson";
import Student from "../models/Student.js";

const getAllStudents = (req, res) => {
  const userId = req.get("uid");
  // console.log(userId);
  if (userId === undefined) {
    res
      .status(500)
      .json({ error: "Failed to Fetch Data Due to invalid parameter" });
  } else
    Student.find({ userId: req.get("uid") })
      .then((data) => {
        // console.log(data);
        if (data.length === 0) {
          res.status(200).json([]);
        } else res.status(200).json(data);
      })
      .catch(() => {
        res.status(500).json({ error: "Error Fetching Data" });
      });
};

const getStudentbyId = (req, res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    Student.findOne({ _id: id })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Error Fetching Data" });
      });
  } else res.status(500).json({ error: "Invalid Data ID" });
};

const deleteStudentbyId = (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    Student.deleteOne({ _id: id })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Error Fetching Data" });
      });
  } else res.status(500).json({ error: "Invalid Data ID" });
};

const createAStudent = async (req, res) => {
  const studentData = req.body;
  // const userId = studentData.userId;
  // console.log(studentData, "student Data");
  const newData = {
    ...studentData,
    userId: new ObjectId(studentData.userId),
  };
  // console.log(newData);
  try {
    const add = await Student.create(newData);
    res.status(201).json(add);
  } catch (e) {
    res.status(500).json({ error: "ERROR CREATING STUDENTS" });
  }
};

const updateStudentbyId = (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  if (ObjectId.isValid(id)) {
    Student.updateOne({ _id: new ObjectId(id) }, { $set: updates })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Error Fetching Data" });
      });
  } else res.status(500).json({ error: "Invalid Data ID" });
};

export {
  getAllStudents,
  deleteStudentbyId,
  updateStudentbyId,
  createAStudent,
  getStudentbyId,
};

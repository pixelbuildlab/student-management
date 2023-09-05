import mongoose from "mongoose";
const objectId = mongoose.Schema.Types.ObjectId;

const studentScheme = new mongoose.Schema(
  {
    _id: {
      type: objectId,
      auto: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    groups: [
      {
        type: String,
      },
    ],
    userId: {
      required: true,
      type: objectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

const Student = mongoose.model("Students", studentScheme);
export default Student;

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskSchema = new mongoose.Schema(
  {
    taskTitle: {
      type: String,
      trim: true,
      required: [true, "title is required"],
      maxlength: 70,
    },
    taskDescription: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
      maxlength: 70,
    },
    taskStatus: {
      type: String,
      enum: ["Pending", "In-Progress", "Completed"],
      default: "Pending",
    },
    dueDate: {
      type: Date,
    },
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: ObjectId,
      ref: "User",
      // required:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
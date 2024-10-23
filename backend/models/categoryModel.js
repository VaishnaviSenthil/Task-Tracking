const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
      required: [true, "Job Category is required"],
      maxlength: 70,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
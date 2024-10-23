const Task = require("../models/taskModel");
const Category= require("../models/categoryModel");
const ErrorResponse = require("../utils/errorResponse");


exports.createTask = async (req, res, next) => {
    console.log(req.user.id);
  try {
    const task = await Task.create({
      taskTitle: req.body.taskTitle,
      taskDescription: req.body.taskDescription,
      taskStatus: req.body.taskStatus,
      dueDate: req.body.dueDate,
      associatedCategory: req.body.associatedCategory,
      user: req.user.id,
    });
    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};


exports.updateTask= async (req, res, next) => {
  try {
    console.log("in side")
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("associatedCategory", "Category")
      .populate("user", "firstName lastName");
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};



exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;

    // Update the job to mark it as deleted
    const task = await Task.findByIdAndDelete(
      taskId
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task marked as deleted",
    });
  } catch (error) {
    next(error);
  }
};


exports.showAllTasks = async (req, res, next) => {
  const keyword = req.query.keyword
    ? {
        $or: [
          {
            taskTitle: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  // filter by category
  let ids = [];
  const taskCategory = await Category.find({}, { _id: 1 });
  taskCategory.forEach((cat) => {
    ids.push(cat._id);
  });
  let cat = req.query.cat;
  let categ = cat !== "" ? cat : ids;

  //   //enable pagination
  //   const pageSize = 5;
  //   const page = Number(req.query.pageNumber) || 1;
  //   //const count = await Job.find({}).estimatedDocumentCount();
  //   const count = await Job.find({
  //     ...keyword,
  //     jobType: categ,
  //     location: locationFilter,
  //   }).countDocuments();

  try {
    const tasks = await Task.find({
      ...keyword,
      associatedCategory: categ,
    })
      .populate("associatedCategory", "Category")
      .populate("user", "firstName")
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.status(200).json({
      success: true,
      tasks,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
  } catch (error) {
    next(error);
  }
};
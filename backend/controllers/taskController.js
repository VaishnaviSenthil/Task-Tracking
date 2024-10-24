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
      Category: req.body.Category,
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
      .populate("Category", "Category")
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
    try {
        console.log("inside showALL");
        const tasks = await Task.find().populate("Category", "category");
        console.log(tasks) 
        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        next(error);
    }
};



exports.showTaskById = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the task ID from the request parameters
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};


const Category = require("../models/categoryModel");
const ErrorResponse = require("../utils/errorResponse")

exports.createCategory = async (req, res, next) => {
  try {
    console.log(req.body);
    const category = await Category.create({
      category: req.body.category,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};


exports.allCategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};



exports.updateCategory = async (req, res, next) => {
  try {
    
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};



exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    console.log("in",req.params.id)
    const category = await Category.findByIdAndDelete(id);
    console.log("Category",category)
    res.status(200).json({
      success: true,
      message: "Deleted successfuly",
    });
  } catch (error) {
    next(new ErrorResponse("Server Error", 500));
  }
};
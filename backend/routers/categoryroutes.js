const express = require("express");
const {
  createCategory,
  allCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");

router.post("/categories", isAuthenticated, createCategory);
router.get("/categories", isAuthenticated, allCategory);
router.put("/categories/:id", isAuthenticated, updateCategory);
router.delete("/categories/delete/:id", isAuthenticated, deleteCategory);


module.exports = router;

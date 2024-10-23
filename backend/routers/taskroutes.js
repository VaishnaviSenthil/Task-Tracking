const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  deleteTask,
  showAllTasks,
} = require("../controllers/taskController");
const { isAuthenticated } = require("../middleware/auth");

router.post("/task/create", isAuthenticated,createTask);
router.put("/task/update/:id", isAuthenticated, updateTask);
router.delete("/task/delete/:id", isAuthenticated, deleteTask);
router.get("/task/showAll", isAuthenticated, showAllTasks);

module.exports = router;
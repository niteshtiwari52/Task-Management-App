const express = require("express");
const {
  welcome,
  createTask,
  fetchTask,
  updateTask,
  deleteTask,
  getsingleTask,
  taskCompleted,
} = require("../Controllers/taskController");
const router = express.Router();

router.post("/create-task", createTask);
router.get("/fetch-task", fetchTask);
router.get("/:id", getsingleTask);
router.put("/update-task/:id", updateTask);
router.delete("/delete-task/:id", deleteTask);
router.put("/set-status/:id", taskCompleted);

module.exports = router;

const taskModel = require("../Model/taskModel");

/**
 * Route : /task/create-task
 *
 */
const createTask = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No Data Provided",
      });
    }

    await taskModel.create(data);
    const allTask = await taskModel.find();

    return res.status(200).json({
      success: true,
      data: allTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    // throw new Error(error.message);
  }
};
/**
 * Route : /api/v1/task/fetch-task
 *
 */
const fetchTask = async (req, res) => {
  try {
    const allTask = await taskModel.find();
    if (allTask.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Task Found",
      });
    }
    res.status(200).json({
      success: true,
      data: allTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/**
 * Route : /api/v1/task/update-task
 *
 */
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const updateTask = await taskModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    const allTask = await taskModel.find();

    return res.status(200).json({
      success: true,
      data: allTask,
    });

    // return res.status(200).json({
    //   success: true,
    //   data: updateTask,
    // });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
/**
 * Route : /api/v1/task/delete-task
 *
 */
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.deleteOne({
      _id: id,
    });

    const allTask = await taskModel.find();

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task to be deleted not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: allTask,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Route : /api/v1/task/:id
 */
const getsingleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task fetched Successfully",
      task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
    // throw new Error(error.message);
  }
};

const taskCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const updateTask = await taskModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    const allTask = await taskModel.find();

    return res.status(200).json({
      success: true,
      data: allTask,
    });

    // return res.status(200).json({
    //   success: true,
    //   data: updateTask,
    // });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  fetchTask,
  updateTask,
  deleteTask,
  getsingleTask,
  taskCompleted,
};

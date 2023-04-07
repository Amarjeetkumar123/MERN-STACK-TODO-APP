import ErrorHandler from "../middlewares/error.js";
import Task from "../models/todoModel.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({ title, description, user: req.user });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    // get login user id
    const userid = req.user._id;
    // match userid from the database
    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// update the login user todo
export const updateMyTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    //   if (!task) {
    //     return res.status(404).json({
    //       success: false,
    //       message: "Invalid id",
    //     });
    //     }
    if (!task) return next(new ErrorHandler("Task not found", 404));
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
// delete the todo
export const deleteMyTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    //   if (!task) {
    //     return res.status(404).json({
    //       success: false,
    //       message: "Invalid id",
    //     });
    //     }

    // short the error handling syntax
    if (!task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

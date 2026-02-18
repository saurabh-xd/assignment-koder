import Task from "../models/task.js";


export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const task = await Task.create({ title, description });
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};


export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};


export const toggleTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};


export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
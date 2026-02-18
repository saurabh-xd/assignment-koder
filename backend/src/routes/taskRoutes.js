import express from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.route('/')
  .get(getAllTasks)
  .post(createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

router.patch('/:id/toggle', toggleTaskStatus);

export default router;
import express from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../Controllers/task.Controller.js';

const router = express.Router();

// Get all tasks
router.get('/', getTasks);

// Add a task
router.post('/', addTask);

// Update a task
router.put('/:id', updateTask);

// Delete a task
router.delete('/:id', deleteTask);

export default router;

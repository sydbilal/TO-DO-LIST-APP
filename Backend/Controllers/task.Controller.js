import Task from '../models/Task.js';

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();  // Fetch all tasks from the database
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a task
export const addTask = async (req, res) => {
  const { description } = req.body;  // Extract task description from request body
  try {
    const newTask = new Task({ description });
    await newTask.save();  // Save the new task to the database
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const { id } = req.params;  // Get task ID from the request URL params
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });  // Update task with the new data
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;  // Get task ID from the request URL params
  try {
    await Task.findByIdAndDelete(id);  // Find the task by ID and delete it
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

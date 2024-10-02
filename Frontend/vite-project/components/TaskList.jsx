import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskDesc, setEditTaskDesc] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/tasks');
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching tasks');
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    try {
      const response = await axios.post('http://localhost:8000/api/tasks', { description: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (err) {
      setError('Error adding task');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError('Error deleting task');
    }
  };

  const handleToggleComplete = async (taskId) => {
    try {
      const updatedTask = tasks.find((task) => task._id === taskId);
      await axios.put(`http://localhost:8000/api/tasks/${taskId}`, {
        completed: !updatedTask.completed,
      });
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (err) {
      setError('Error updating task');
    }
  };

  const handleEditTask = (task) => {
    setEditTaskId(task._id);
    setEditTaskDesc(task.description);
  };

  const handleSaveEditTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:8000/api/tasks/${taskId}`, { description: editTaskDesc });
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, description: editTaskDesc } : task
        )
      );
      setEditTaskId(null);
      setEditTaskDesc('');
    } catch (err) {
      setError('Error editing task');
    }
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setEditTaskDesc('');
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Task List</h2>
      
      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="flex mb-6 w-full max-w-md">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
          Add Task
        </button>
      </form>

      {/* List of Tasks */}
      <div className="w-full max-w-md">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div
              key={task._id}
              className="bg-gray-100 p-4 mb-3 rounded-lg flex items-center justify-between shadow-sm"
            >
              {/* Task Index */}
              <span className="text-gray-500 text-xl font-bold">{index + 1}</span>
              
              {editTaskId === task._id ? (
                <div className="flex-grow mx-4">
                  <input
                    type="text"
                    value={editTaskDesc}
                    onChange={(e) => setEditTaskDesc(e.target.value)}
                    className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div className="mt-2 flex justify-between">
                    <button onClick={() => handleSaveEditTask(task._id)} className="text-blue-500">
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className="text-red-500">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-grow mx-4">
                  <p className={task.completed ? 'line-through text-gray-400' : 'text-gray-800'}>
                    {task.description}
                  </p>
                  <div className="mt-2 flex justify-between">
                    <button onClick={() => handleEditTask(task)} className="text-blue-500">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(task._id)} className="text-red-500">
                      Delete
                    </button>
                    <button onClick={() => handleToggleComplete(task._id)} className="text-green-500">
                      {task.completed ? 'Unmark' : 'Complete'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;

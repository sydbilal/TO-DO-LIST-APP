import React from 'react';
import './App.css';
import TaskList from '../components/TaskList';

function App() {
  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <TaskList/>
      </div>
  );
}

export default App;

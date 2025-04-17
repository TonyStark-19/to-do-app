// css file
import './App.css';

// react
import { useState, useEffect } from 'react';

// icons
import { FaRegCircle, FaCheckCircle, FaTrash, FaPlus } from 'react-icons/fa';
import { SlOptions } from "react-icons/sl";

// main page
export default function TodoApp() {
  return (
    <div className='container'>
      <Navbar />
      <Task />
    </div>
  );
}

// navbar
function Navbar() {
  return (
    <div className='navbar'>
      <div className='date'>
        <h2>My Day</h2>
        <p>{GetDate()}</p>
      </div>
      <div className='options'>
        <div className='icon-wrap'>
          <SlOptions className='options-icon' />
        </div>
      </div>
    </div>
  );
}

// get date function
function GetDate() {
  const today = new Date();

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

  const weekday = weekDays[today.getDay()];
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month = allMonths[today.getMonth()];

  return `${weekday}, ${day} ${month}`;
}

// tasks
function Task() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("todo-tasks");
    console.log("Saved tasks in localStorage:", savedTasks);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
    console.log("Saved to localStorage:", tasks);
  }, [tasks]);

  // if enter pressed add task
  const handleAddTask = (e) => {
    if (e.key === 'Enter' && newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  // task icon for completion
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // delele function
  const handleDeleteClick = (index) => {
    setTaskToDelete(index);
    setShowDelete(true);
  };

  // confirm deletion
  const confirmDelete = () => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskToDelete, 1);
    setTasks(updatedTasks);
    setShowDelete(false);
    setTaskToDelete(null);
  };

  return (
    <>
      <div className='tasks'>
        <div className='task-container'>
          {tasks.map((task, index) => (
            <TaskElements
              key={index}
              text={task.text}
              completed={task.completed}
              onToggle={() => toggleTask(index)}
              onDelete={() => handleDeleteClick(index)}
            />
          ))}
        </div>

        <div className='task-input-box'>
          <FaPlus className="add-icon" />
          <input
            type='text'
            placeholder='Add Task'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleAddTask}
          />
        </div>
      </div>

      {showDelete && (
        <div className='delete-container'>

          <div className='delete-box'>

            <div className='delete-text'>
              <h2>Delete task</h2>
              <p>"{tasks[taskToDelete]?.text}" will be permanently deleted.</p>
            </div>

            <div className='buttons'>
              <button className='delete-btn' onClick={confirmDelete}>Delete</button>
              <button className='cancel-btn' onClick={() => setShowDelete(false)}>Cancel</button>
            </div>

          </div>

        </div>
      )}
    </>
  );
}

// task elements
function TaskElements({ text, completed, onToggle, onDelete }) {
  return (
    <div className='task-item'>
      <div className='task-text-wrap' onClick={onToggle}>
        {completed ? (
          <FaCheckCircle className='task-icon completed-icon' />
        ) : (
          <FaRegCircle className='task-icon' />
        )}
        <span className={`task-text ${completed ? 'completed' : ''}`}>
          {text}
        </span>
      </div>
      <FaTrash className='delete-icon' onClick={onDelete} />
    </div>
  );
}
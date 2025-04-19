// css file
import './App.css';

// react
import { useState, useEffect, useRef } from 'react';

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
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("todo-tasks");

    try {
      const parsed = JSON.parse(savedTasks);
      if (Array.isArray(parsed)) {
        setTasks(parsed);
      }
    } catch (error) {
      console.error("Error parsing saved tasks:", error);
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // if enter pressed add task
  const handleAddTask = (e) => {
    if (e.key === 'Enter' && newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  // for preloading ding sound
  const completionSoundRef = useRef(null);

  useEffect(() => {
    completionSoundRef.current = new Audio('/sounds/ding.mp3');
    completionSoundRef.current.load(); // Preload the sound
  }, []);

  // task icon for completion
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);

    // Play sound if task is completed
    if (updatedTasks[index].completed && completionSoundRef.current) {
      completionSoundRef.current.currentTime = 0; // rewind to start
      completionSoundRef.current.play();
    }
  };

  // delete function
  const handleDeleteClick = (index) => {
    setTaskToDelete(index);
    setShowDelete(true);
  };

  // for preloading pop sound
  const deleteSoundRef = useRef(null);

  useEffect(() => {
    deleteSoundRef.current = new Audio('/sounds/pop.mp3');
    deleteSoundRef.current.load(); // Preload pop sound
  }, []);

  // confirm deletion
  const confirmDelete = () => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskToDelete, 1);
    setTasks(updatedTasks);
    setShowDelete(false);
    setTaskToDelete(null);

    // Play delete sound
    if (deleteSoundRef.current) {
      deleteSoundRef.current.currentTime = 0;
      deleteSoundRef.current.play();
    }
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

          {tasks.length === 0 && (
            <div className='todo-intro-box'>
              <h2>Focus on your day</h2>
              <p>Make your day more productive by creating a task list.</p>
            </div>
          )}

        </div>

        <div className='input-box-wrap'>

          <div className='task-input-box'>
            {isInputFocused ? (
              <FaRegCircle className="add-icon focused-icon" />
            ) : (
              <FaPlus className="add-icon" />
            )}
            <input
              type='text'
              placeholder={isInputFocused ? 'Start typing your task...' : 'Add Task'}
              value={newTask}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleAddTask}
            />
          </div>

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
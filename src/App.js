// css file
import './App.css';

// react
import { useState, useEffect, useRef } from 'react';

// icons
import { FaRegCircle, FaCheckCircle, FaTrash } from 'react-icons/fa';
import { FiPlusCircle } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
import { RiCalendarTodoFill } from "react-icons/ri";

// main page
export default function TodoApp() {
  const [showOptions, setShowOptions] = useState(false); // state for options div
  const [themeColor, setThemeColor] = useState('#a0cbf1'); // default theme color

  return (
    <div
      className="container"
      style={{
        color: themeColor,
        background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, transparent 40%), linear-gradient(120deg, #0f0e17 0%, #1a1b26 100%)"
      }}
    >
      <Navbar toggleOptions={() => setShowOptions(!showOptions)} />
      <Task showOptions={showOptions} setShowOptions={setShowOptions}
        themeColor={themeColor} setThemeColor={setThemeColor}
        toggleOptions={() => setShowOptions(!showOptions)} />
    </div>
  );
}

// navbar
function Navbar({ toggleOptions, themeColor }) {
  return (
    <div className='navbar'>

      <div className='date' style={{ color: themeColor }}>
        <h2>My Day</h2>
        <p>{GetDate()}</p>
      </div>

      <div className='options'>
        <div className='icon-wrap' onClick={toggleOptions}>
          <SlOptions className='options-icon' style={{ color: themeColor }} />
        </div>
      </div>

    </div>
  );
}

// get date function
function GetDate() {
  const today = new Date();

  // weekdays
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  // months
  const allMonths = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

  const weekday = weekDays[today.getDay()];
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const month = allMonths[today.getMonth()];

  // return date format
  return `${weekday}, ${day} ${month}`;
}

// tasks
function Task({ showOptions, toggleOptions, themeColor, setThemeColor }) {
  const [tasks, setTasks] = useState([]); //state for tasks
  const [newTask, setNewTask] = useState(''); //state for new tasks
  const [showDelete, setShowDelete] = useState(false); //state for delete container
  const [taskToDelete, setTaskToDelete] = useState(null); //state for deleted tasks
  const [isInputFocused, setIsInputFocused] = useState(false); //state for input focus effect
  const [feedback, setFeedback] = useState(''); //state for feedback message

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
      setFeedback('Task added ✅');
    }
  };

  // to haddle ask addition for smaller screens
  const handleAddTaskClick = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  // preload ding sound
  const completionSoundRef = useRef(null);

  useEffect(() => {
    completionSoundRef.current = new Audio('/sounds/ding.mp3');
    completionSoundRef.current.load();
  }, []);

  // task icon toggle
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    const taskToUpdate = updatedTasks[index];
    taskToUpdate.completed = !taskToUpdate.completed;
    setTasks(updatedTasks);

    // Play sound on completion
    if (taskToUpdate.completed && completionSoundRef.current) {
      completionSoundRef.current.currentTime = 0;
      completionSoundRef.current.play();
    }

    // Set feedback message
    setFeedback(taskToUpdate.completed ? 'Task completed 🎉' : 'Task marked incomplete ✏️');
  };

  // delete click
  const handleDeleteClick = (index) => {
    setTaskToDelete(index);
    setShowDelete(true);
  };

  // preload pop sound
  const deleteSoundRef = useRef(null);

  useEffect(() => {
    deleteSoundRef.current = new Audio('/sounds/pop.mp3');
    deleteSoundRef.current.load();
  }, []);

  // confirm deletion
  const confirmDelete = () => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskToDelete, 1);
    setTasks(updatedTasks);
    setShowDelete(false);
    setTaskToDelete(null);
    setFeedback('Task deleted 🗑️');

    if (deleteSoundRef.current) {
      deleteSoundRef.current.currentTime = 0;
      deleteSoundRef.current.play();
    }
  };

  // for feedback message
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // tasks list informarion
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <>
      <div className='tasks'>

        {feedback && (
          <div className='feedback-message' style={{ color: themeColor }}>
            {feedback}
          </div>
        )}

        <div className='task-container'>

          {tasks.map((task, index) => (
            <TaskElements
              key={index}
              text={task.text}
              completed={task.completed}
              onToggle={() => toggleTask(index)}
              onDelete={() => handleDeleteClick(index)}
              themeColor={themeColor}
            />
          ))}

          {tasks.length === 0 && (
            <div className='todo-intro-box' style={{ color: themeColor }}>
              <RiCalendarTodoFill className='todo-intro-box-icon' />
              <h2>Focus on your day</h2>
              <p>Make your day more productive by creating a task list.</p>
            </div>
          )}

        </div>

        <div className='input-box-wrap'>

          <div className='task-input-box'>

            <FiPlusCircle className="add-icon" style={{ color: themeColor }} onClick={handleAddTaskClick} />

            <input
              style={{ '--placeholder-color': themeColor }}
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

      {showOptions && (
        <div className='option-box'>

          <div className='theme-box'>

            <h3>Theme</h3>

            <div className='theme-box-wrap'>
              {['#788cde', '#bc7abc', '#e46c8c', '#e46b67', '#4aa079',
                '#479e98', '#8795a0', '#a0cbf1', '#ecbda2', '#9ad2ba'].map((color, idx) => (
                  <div
                    key={idx}
                    className={`theme ${themeColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      // 1. Set the new theme color
                      setThemeColor(color);
                      // 2. Toggle the options div (close the menu)
                      toggleOptions();
                    }}
                  />
                ))}
            </div>

          </div>

          <div className='task-info-box'>

            <h3>List information:</h3>

            <div className='box1'>
              <p>Total number of tasks:</p>
              <p>{totalTasks} {totalTasks === 1 ? 'task' : 'tasks'} added</p>
            </div>

            <div className='box2'>
              <p>Tasks completed:</p>
              <p>{completedTasks} of {totalTasks} completed</p>
            </div>

            <div className='box3'>
              <p>Tasks pending:</p>
              <p>{pendingTasks} of {totalTasks} pending</p>
            </div>

          </div>

        </div>
      )}
    </>
  );
}

// task elements
function TaskElements({ text, completed, onToggle, onDelete, themeColor }) {
  return (
    <div className='task-item'>

      <div className='task-text-wrap' onClick={onToggle}>
        {completed ? (
          <FaCheckCircle className='task-icon completed-icon' style={{ color: themeColor }} />
        ) : (
          <FaRegCircle className='task-icon' />
        )}
        <span className={`task-text ${completed ? 'completed' : ''}`}>
          {text}
        </span>
      </div>

      <FaTrash className='delete-icon' onClick={onDelete} />

    </div >
  );
}
// css file
import './App.css';

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
  return (
    <div className='tasks'>
      <div className='task-container'>
        <TaskElements />
      </div>
      <div className='task-input-box'>
        <FaPlus className="add-icon" />
        <input type='text' placeholder='Add Task'></input>
      </div>
    </div>
  )
}

// task elements

function TaskElements() {
  return (
    <div className='task-item'>
      <div className='task-text-wrap'>
        <FaRegCircle className='task-icon' />
        <span className='task-text'>Finish coding</span>
      </div>
      <FaTrash className='delete-icon' />
    </div>
  )
}
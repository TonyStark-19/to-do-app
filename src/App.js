// import css
import './App.css';

// import hooks
import { useState, useEffect } from 'react';

// import components
import Navbar from './components/Navbar';
import Task from './components/Task';

// to do app component
export default function TodoApp() {
  const [showOptions, setShowOptions] = useState(false);
  const [themeColor, setThemeColor] = useState(() => {
    return localStorage.getItem("todo-theme") || '#a0cbf1';
  });

  // save theme color to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("todo-theme", themeColor);
  }, [themeColor]);

  return (
    <div
      className="container"
      style={{
        color: themeColor,
        background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, transparent 40%), linear-gradient(120deg, #0f0e17 0%, #1a1b26 100%)"
      }}
    >
      <Navbar
        toggleOptions={() => setShowOptions(prev => !prev)}
        themeColor={themeColor}
      />

      <Task
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        toggleOptions={() => setShowOptions(prev => !prev)}
      />
    </div>
  );
}
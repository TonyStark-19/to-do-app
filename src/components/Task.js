// import components
import TaskElements from "./TaskElements";

// import hooks
import { useState, useEffect, useRef } from 'react';

// import icons
import { FiPlusCircle } from "react-icons/fi";
import { RiCalendarTodoFill } from "react-icons/ri";

// Theme Palette Constants
const THEME_COLORS = [
    '#788cde', '#bc7abc', '#e46c8c', '#e46b67', '#4aa079',
    '#479e98', '#8795a0', '#a0cbf1', '#ecbda2', '#9ad2ba'
];

// Main Task Container Component
export default function Task({ showOptions, toggleOptions, themeColor, setThemeColor }) {
    const [tasks, setTasks] = useState(() => {
        try {
            const savedTasks = localStorage.getItem("todo-tasks");
            const parsed = JSON.parse(savedTasks);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    });

    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [feedback, setFeedback] = useState('');

    // Audio Refs
    const completionSoundRef = useRef(null);
    const deleteSoundRef = useRef(null);

    // Initialize Audio
    useEffect(() => {
        completionSoundRef.current = new Audio('/sounds/ding.mp3');
        deleteSoundRef.current = new Audio('/sounds/pop.mp3');
    }, []);

    // Sync to local storage
    useEffect(() => {
        localStorage.setItem("todo-tasks", JSON.stringify(tasks));
    }, [tasks]);

    // Feedback Toast Timer
    useEffect(() => {
        if (feedback) {
            const timer = setTimeout(() => setFeedback(''), 2200);
            return () => clearTimeout(timer);
        }
    }, [feedback]);

    // Play sound helper
    const playSound = (soundRef) => {
        if (soundRef.current) {
            soundRef.current.currentTime = 0;
            soundRef.current.play().catch(() => { });
        }
    };

    // Task Operations
    const addTask = () => {
        if (!newTask.trim()) return;
        const item = { id: Date.now() + Math.random(), text: newTask.trim(), completed: false };
        setTasks(prev => [...prev, item]);
        setNewTask('');
        setFeedback('Task added ✅');
    };

    // Handle Enter key for adding task
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') addTask();
    };

    // Toggle task completion
    const toggleTask = (id) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                const updatedStatus = !task.completed;
                if (updatedStatus) playSound(completionSoundRef);
                setFeedback(updatedStatus ? 'Task completed 🎉' : 'Task marked incomplete ✏️');
                return { ...task, completed: updatedStatus };
            }
            return task;
        }));
    };

    // Edit task text
    const handleEditTask = (id, newText) => {
        if (!newText.trim()) return;
        setTasks(prev => prev.map(task => task.id === id ? { ...task, text: newText.trim() } : task));
        setFeedback('Task updated 📝');
    };

    // Delete task with confirmation
    const handleDeleteClick = (task) => {
        setTaskToDelete(task);
        setShowDeleteModal(true);
    };

    // Confirm deletion of task 
    const confirmDelete = () => {
        if (!taskToDelete) return;
        setTasks(prev => prev.filter(task => task.id !== taskToDelete.id));
        setShowDeleteModal(false);
        setTaskToDelete(null);
        setFeedback('Task deleted 🗑️');
        playSound(deleteSoundRef);
    };

    // 
    const clearCompleted = () => {
        setTasks(prev => prev.filter(task => !task.completed));
        setFeedback('Completed tasks cleared 🧹');
    };

    // Filter calculations
    const filteredTasks = tasks.filter(t => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    return (
        <>
            <div className='tasks'>
                {feedback && (
                    <div
                        className='feedback-message'
                        style={{ color: themeColor }}
                    >
                        {feedback}
                    </div>
                )}

                {/* Filter Controls */}
                {totalTasks > 0 && (
                    <div
                        className='task-filters'
                        style={{ display: 'flex', gap: '8px', marginBottom: '20px', marginTop: '20px' }}
                    >
                        {['all', 'active', 'completed'].map((f) => (
                            <button
                                key={f}
                                className={`filter-btn ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                                style={{
                                    textTransform: 'capitalize',
                                    color: filter === f ? '#0f0e17' : themeColor,
                                    backgroundColor: filter === f ? themeColor : 'transparent',
                                    border: `1px solid ${themeColor}`,
                                    borderRadius: '12px',
                                    padding: '4px 12px',
                                    cursor: 'pointer'
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                )}

                <div className='task-container'>
                    {filteredTasks.map((task) => (
                        <TaskElements
                            key={task.id}
                            task={task}
                            onToggle={() => toggleTask(task.id)}
                            onDelete={() => handleDeleteClick(task)}
                            onEdit={(newText) => handleEditTask(task.id, newText)}
                            themeColor={themeColor}
                        />
                    ))}

                    {tasks.length === 0 && (
                        <div
                            className='todo-intro-box'
                            style={{ color: themeColor }}
                        >
                            <RiCalendarTodoFill className='todo-intro-box-icon' />
                            <h2>Focus on your day</h2>
                            <p>Make your day more productive by creating a task list.</p>
                        </div>
                    )}
                </div>

                <div className='input-box-wrap'>
                    <div className='task-input-box'>
                        <FiPlusCircle
                            className="add-icon"
                            style={{ color: themeColor, cursor: 'pointer' }}
                            onClick={addTask}
                        />

                        <input
                            style={{ '--placeholder-color': themeColor }}
                            type='text'
                            placeholder={isInputFocused ? 'Start typing your task...' : 'Add Task'}
                            value={newTask}
                            onFocus={() => setIsInputFocused(true)}
                            onBlur={() => setIsInputFocused(false)}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className='delete-container'>
                    <div className='delete-box'>
                        <div className='delete-text'>
                            <h2>Delete task</h2>
                            <p>"{taskToDelete?.text}" will be permanently deleted.</p>
                        </div>

                        <div className='buttons'>
                            <button
                                className='delete-btn'
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>

                            <button
                                className='cancel-btn'
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Options & Theme Modal */}
            {showOptions && (
                <div className='option-box'>
                    <div className='theme-box'>
                        <h3>Theme</h3>

                        <div className='theme-box-wrap'>
                            {THEME_COLORS.map((color, idx) => (
                                <div
                                    key={idx}
                                    className={`theme ${themeColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => {
                                        setThemeColor(color);
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

                        {completedTasks > 0 && (
                            <button
                                onClick={clearCompleted}
                                style={{
                                    marginTop: '12px',
                                    width: '100%',
                                    padding: '8px',
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    border: '1px solid #ef4444',
                                    color: '#ef4444',
                                    borderRadius: '6px',
                                    cursor: 'pointer'
                                }}
                            >
                                Clear Completed Tasks
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
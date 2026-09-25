// import hooks
import { useState } from 'react';

// import icons
import { FaRegCircle, FaCheckCircle, FaTrash, FaEdit } from 'react-icons/fa';

// Individual Task Item Component with Inline Editing
export default function TaskElements({ task, onToggle, onDelete, onEdit, themeColor }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    // Handle saving the edited task text
    const handleSave = () => {
        if (editText.trim() && editText !== task.text) {
            onEdit(editText);
        } else {
            setEditText(task.text);
        }
        setIsEditing(false);
    };

    // Handle key events for saving or canceling edit
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') {
            setEditText(task.text);
            setIsEditing(false);
        }
    };

    return (
        <div className='task-item'>
            <div className='task-text-wrap'>
                <span
                    onClick={onToggle}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                    {task.completed ? (
                        <FaCheckCircle
                            className='task-icon completed-icon'
                            style={{ color: themeColor }}
                        />
                    ) : (
                        <FaRegCircle className='task-icon' />
                    )}
                </span>

                {isEditing ? (
                    <input
                        type="text"
                        className="edit-task-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        style={{
                            background: 'transparent',
                            border: 'none',
                            borderBottom: `1px solid ${themeColor}`,
                            color: 'inherit',
                            outline: 'none',
                            width: '100%',
                            marginLeft: '8px'
                        }}
                    />
                ) : (
                    <span
                        className={`task-text ${task.completed ? 'completed' : ''}`}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {task.text}
                    </span>
                )}
            </div>

            <div
                className='task-actions'
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
            >
                {!task.completed && !isEditing && (
                    <FaEdit
                        className='edit-icon'
                        onClick={() => setIsEditing(true)}
                        style={{ cursor: 'pointer', opacity: 0.7 }}
                    />
                )}

                <FaTrash
                    className='delete-icon'
                    onClick={onDelete}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
}
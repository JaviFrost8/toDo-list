import React from 'react'

export const Task = ({ task, toggleTaskCompleted, handleDelete }) => {

  return (
    <div className={`task ${task.completed ? 'taskCompleted' : ''}`}>
      <div className={`text ${task.completed ? 'text-through' : ''}`}>{task.text}</div>
      <div className='btnsTask'>
        <button onClick={() => toggleTaskCompleted(task.id)}>✅</button>
        <button onClick={() => handleDelete(task.id)}>❌</button>
      </div>
    </div>
  )
}

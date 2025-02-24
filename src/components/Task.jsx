<<<<<<< HEAD
import React, { useEffect, useRef, useState } from 'react'
=======
import React, { useState } from 'react'
>>>>>>> e853b07c0a04d64e3c1cd8801d27fdde3984a1ea

export const Task = ({ task, toggleTaskCompleted, handleDelete, handleEdit, handleSave, isEditing, handleCancelEdit }) => {

  const [localText, setLocalText] = useState(task.text)
<<<<<<< HEAD
  const inputRef = useRef()

  useEffect(() => {
    if(isEditing){
      inputRef.current.focus()
    }
  }, [isEditing])

  function handleKeyDown(e){
    if(e.key === 'Enter') handleSave(localText)
    if(e.key === 'Escape') handleCancelEdit()
  }
=======
>>>>>>> e853b07c0a04d64e3c1cd8801d27fdde3984a1ea


  return (
    <div className={`task ${task.completed ? 'taskCompleted' : ''}`}>
      {isEditing ? (
        <>
          <input
            type='text'
<<<<<<< HEAD
            ref={inputRef}
            value={localText}
            onKeyDown={handleKeyDown}
=======
            value={localText}
>>>>>>> e853b07c0a04d64e3c1cd8801d27fdde3984a1ea
            onChange={(e) => setLocalText(e.target.value)}
          />
          <button onClick={() => handleSave(localText)}>✅ Guardar</button>
          <button onClick={handleCancelEdit}>❌ Cancelar</button>
        </>
      ) : (
        <>
          <div className={`text ${task.completed ? 'text-through' : ''}`}>{task.text}</div>
          <button onClick={handleEdit} className='editBtn'>✏️ Editar</button>
          <div className='btnsTask'>
            <button onClick={() => toggleTaskCompleted(task.id)}>✅</button>
            <button onClick={() => handleDelete(task.id)}>❌</button>
          </div>
        </>
      )}

    </div>
  )
}
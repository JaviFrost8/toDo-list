import React, { useEffect, useRef, useState } from 'react'

export const Task = ({ task, toggleTaskCompleted, handleDelete, handleEdit, handleSave, isEditing, handleCancelEdit }) => {

  const [localText, setLocalText] = useState(task.text)
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


  return (
    <div className={`task ${task.completed ? 'taskCompleted' : ''}`}>
      {isEditing ? (
        <>
          <input
            type='text'
            ref={inputRef}
            value={localText}
            onKeyDown={handleKeyDown}
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
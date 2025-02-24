import React, { useEffect, useState } from 'react'
import { Task } from './Task';

export const ToDoApp = () => {

  const [text, setText] = useState('')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const filteredTask = tasks.filter(task => {
    if(filter === 'completed') return task.completed;
    if(filter === 'pending') return !task.completed 

    return true
  })

  function handleAddTask(){
    if(text.trim() === '') return;
    const newTask = {id: Date.now(), text, completed: false}
    setTasks([...tasks, newTask])
    setText('')
  }

  function toggleTaskCompleted(taskId){
    setTasks(prevTask => 
      prevTask.map(task => (
        task.id === taskId ? {...task, completed: !task.completed} : task
      ))
    )
  }

  function handleDelete(taskId){
    setTasks(prevTask => 
      prevTask.filter(task => task.id !== taskId)
    )
  }

  function handleEdit(taskId, text){
    setEditingId(taskId)
    setEditingText(text)
  }

  function handleSave(taskId, newText){
    setTasks(prevTasks => 
      prevTasks.map(task => (
        task.id === taskId ? {...task, text: newText} : task
      ))
    )

    setEditingId(null)
    setEditingText('')
  }

  function handleCancelEdit(){
    setEditingId(null)
    setEditingText('')
  }

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'))
    if(savedTasks){
      setTasks(savedTasks)
    }
  }, [])

  useEffect(() => {
    if(tasks.length > 0){
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  return (
    <div className='container'>
      <h1>Lista de tareas</h1>

      <div className='btnsContainer'>
        <button onClick={() => setFilter('all')}>Todas</button>
        <button onClick={() => setFilter('completed')}>Completadas</button>
        <button onClick={() => setFilter('pending')}>Pendientes</button>
      </div>

      <input
        type='text'
        placeholder='Introduce tarea...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className='addBtn' onClick={handleAddTask}>Agregar tarea</button>

      <div className='tasksContainer'>
        {
          filteredTask.map((task) => (
            <Task
              key={task.id}
              toggleTaskCompleted={toggleTaskCompleted}
              handleEdit={() => handleEdit(task.id, task.text)}
              handleSave={(newText) => handleSave(task.id, newText)}
              handleCancelEdit={handleCancelEdit}
              isEditing={editingId === task.id}
              handleDelete={handleDelete}
              task={task}
            />
          ))
        }
      </div>
    </div>
  )
}
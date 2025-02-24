import React, { useEffect, useState } from 'react'
import { Task } from './Task';

export const ToDoApp = () => {

  const [text, setText] = useState('')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

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
              handleDelete={handleDelete}
              task={task}
            />
          ))
        }
      </div>
    </div>
  )
}

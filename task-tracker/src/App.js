
import Header from './components/Header'
import Tasks from './components/Tasks'
import CreateTask from './components/CreateTask'
import Footer from './components/Footer'
import {BrowserRouter as Router} from 'react-router-dom'
import { useState, useEffect } from 'react'


function App() {
  const [tasks, setTasks] = useState([])
  
  const [showAddTaskForm, setShowAddTaskForm] = useState(false)

  const onTaskDelete = async (id) => {

    // deleting from json-server
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    // deleteing from UI
    setTasks(tasks.filter((task)=> (task.id!==id)))
  }
  const onTaskReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    console.log(' task  to toggle: ', taskToToggle)

    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updatedTask), 
    })

    const changedTask = await res.json()
    console.log('changed task : ', changedTask)
    setTasks(tasks.map((task)=> task.id === id ? { ...task, reminder: changedTask.reminder } : task))
  }

  const addTask = async (task) => {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task)
      })

      const newTask = await res.json()
      setTasks([...tasks, newTask])

  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch  All Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Fecth Single Task via id
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  return (
    <Router>
      <div className="container">
        <Header title='Tasks Lists' showAddTaskFrom = {showAddTaskForm} toggleAddTaskFrom={() => {setShowAddTaskForm(!showAddTaskForm)}}/>
       
        <>
            { showAddTaskForm && <CreateTask onAdd={addTask}/>}
            {tasks.length > 0 ? (<Tasks tasks={tasks} onTaskDelete = {onTaskDelete} onTaskReminder={onTaskReminder}/>) : ('No Tasks Found')}

        </>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;

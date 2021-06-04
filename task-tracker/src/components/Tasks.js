
import Task from './Task'

const Tasks = ({tasks, onTaskDelete, onTaskReminder}) => {
 
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task = {task} onTaskDelete={onTaskDelete} onTaskReminder={onTaskReminder}/>   
      ))}
    </>
  )
}



export default Tasks

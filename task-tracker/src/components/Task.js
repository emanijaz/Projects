import { FaTimes }  from 'react-icons/fa'

function Task({task, onTaskDelete, onTaskReminder}) {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`}  onDoubleClick={() => onTaskReminder(task.id)}>
        <h3 >
           {task.title}<FaTimes style={{ color: 'red', cursor: 'pointer'}} onClick={() => onTaskDelete(task.id)} />
        </h3> 
       <p>{task.description}</p>
       <p>{task.dayAndTime}</p>
       

    </div>
  )
}


export default Task


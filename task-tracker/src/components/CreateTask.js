import { useState } from 'react'

function CreateTask({onAdd}) {


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dayAndTime, setDayAndTime] = useState('')
    const [reminder, setReminder] = useState(true)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!title){
            alert('Please add Title ');
            return;
        }
        if(!description){
            alert('Please add Description ');
            return;
        }
        if(!dayAndTime){
            alert('Please add Day and Time ');
            return;
        }
        console.log(dayAndTime)
        onAdd({title, description, dayAndTime, reminder});

        // clearing fields
        setTitle('');
        setDescription('');
        setDayAndTime('');
        setReminder(false);
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Title</label>
                <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>

            <div className='form-control'>
                <label>Description</label>
                <input type='text' placeholder='Description' value={description} onChange={(e)=> setDescription(e.target.value)}></input>
            </div>

            <div className='form-control'>
                <label>Day and Time</label>
                <input type='text' placeholder='Add Day and Time' value={dayAndTime} onChange={(e) => setDayAndTime(e.target.value)}></input>
            </div>

            <div className='form-control form-control-check'>
                <label>Reminder</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.target.checked)}></input>
            </div>

            <input type='submit' value='Add Task' className='btn btn-block'></input>

        </form>
    )
}


export default CreateTask


import Button from './Button'
import {useLocation} from 'react-router-dom'
const Header = ({title, toggleAddTaskFrom, showAddTaskFrom}) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
           
            <Button text={showAddTaskFrom ? 'Close' : 'Add'} color={showAddTaskFrom ? 'Red':'Green'}  onClick={toggleAddTaskFrom}/>
            
        </header>
    )
}

export default Header

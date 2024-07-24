import React,{useContext} from 'react'
import noteContext from '../context/noteContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan,faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context;

    const {updateNote,note,showAlert}=props
    
    return (
        <div className='col-md-3'>                   
            <div className="card my-3">
                {/* <img src="..." className="card-img-top" alt="..."/> */}
                    <div className="card-body">
                        <div className='d-flex align-items-center'>
                            <h5 className="card-title">{note.title}</h5>
                            <FontAwesomeIcon icon={faTrashCan } className="mx-2" onClick={()=>{deleteNote(note._id); showAlert("Deleted note successfully","success")}} style={{cursor:"pointer"}}/>
                            <FontAwesomeIcon icon={faPenToSquare} style={{cursor:"pointer"}} onClick={()=>{updateNote(note)}}/>
                        </div>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text"><small>{note.tag}</small></p>
                        <div className='text-center '>
                        <button className="btn btn-primary " onClick={()=>{deleteNote(note._id); showAlert("Deleted note successfully","success")}}>Done</button>
                        </div>
                        
                    </div>
            </div>
        </div>
    )
}

export default NoteItem
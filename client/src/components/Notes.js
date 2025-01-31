import React,{useContext,useEffect, useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/noteContext'
import AddNote from './AddNote'
import NavItem from './NoteItem'

const Notes = (props) => {
    const context = useContext(noteContext)
    let navigate = useNavigate();
    const {getNote, editNote,notes} = context
    
    useEffect(() => {
      if(localStorage.getItem('token')){
        getNote() 
      }else{ 
        navigate("/login")
      }
      // eslint-disable-next-line
    }, [])

    
    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({id:"",etitle:"", edescription:"",etag:""})
    
    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }

  const handleClick =(e)=>{
    console.log("updated note",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    props.showAlert("Updated Note Successfully","success")
  }

const onchange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <>
    <AddNote showAlert={props.showAlert}/>

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='container my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" value={note.etitle} minLength={5} required name='etitle' onChange={onchange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" value={note.edescription} minLength={5} required id="edescription" name='edescription' onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={note.etag} id="etag" name='etag' onChange={onchange} />
                    </div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={(note.etitle.length<5 || note.edescription.length<5)} onClick={handleClick} className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    <div className='row my-3'> 
        <h2>Your Notes</h2>
        <div className='mx-2'>
        {notes.length===0 && "No notes to display"}
        </div>
        { notes.map((note)=>{
          return <NavItem  key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note}/>
          //   return note.title;
        })}</div>
    </>
  )
}

export default Notes
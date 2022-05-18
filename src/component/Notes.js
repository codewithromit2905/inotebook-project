import React from 'react'
import noteContext from '../context/Notecontext';
import { useContext, useRef ,useState} from "react";
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext)
    const { notes, getallNotes,editNote } = context;
    const [note, setNote] = useState({etitle:"", edescription:"",etag:""})
    useEffect(() => {
        if(localStorage.getItem('token')){


            getallNotes()
        }
        else{
            navigate("/login")
            console.log("please login ")

        }

    }, [])
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({eid:currentNote._id,  etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag })

    }
    const handleonchnage=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleonclick=(e)=>{
        console.log("updating the note" + note)
        editNote(note.eid,note.etitle,note.edescription,note.etag)
        refclose.current.click()
        e.preventDefault()
        props.showAlert("Note updated sucessfully","sucesss")
        
    }

    
    const ref = useRef(null)
    const refclose = useRef(null)
    return (
        <>
            <Addnotes />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={handleonchnage} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={handleonchnage} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handleonchnage} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"  onClick={handleonclick} >update note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row  my-3' ><h2>your note</h2>
            <div className="container">
            {notes.length===0 &&  "No Notes to Display"}
            </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />

                })}
            </div>
        </>
    )
}

export default Notes 
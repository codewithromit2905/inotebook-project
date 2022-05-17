import React from 'react'
import noteContext from '../context/Notecontext';
import { useContext,useState } from "react";

const Addnotes = (props) => {
    const context = useContext(noteContext)
    const { addNotes } = context
    const [note, setNote] = useState({title:"", description:"",tag:""})
    const handleonclick=(e)=>{
        addNotes(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        console.log(props.showAlert)
        props.showAlert("Note is added sucessfully ","sucesss")
        e.preventDefault()
        
    }
    const handleonchnage=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})


    }


    return (
        <div>
            <div className="container">
                <h2>Add a note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">title</label>
                        <input type="text" className="form-control" id="title"  name='title' aria-describedby="emailHelp"  value={note.title}  onChange={handleonchnage}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">description</label>
                        <input type="text" className="form-control" id="description" name='description'  value={note.description}onChange={handleonchnage} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={handleonchnage} />
                    </div>
                
                    <button  disabled={note.title.length<5 || note.description.length<5} type="submit"  className="btn btn-primary" onClick={handleonclick}>Add note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnotes
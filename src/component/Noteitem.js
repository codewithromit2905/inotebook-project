import React from 'react'
import noteContext  from '../context/Notecontext';
import { useContext } from "react";
const Noteitem = (props) => {
  
    const context = useContext(noteContext)
    const {deleteNote}=context
    const { note ,updateNote} = props
    return (
        <div className="col-md-3 my-3 ">
            
            <div className="card" >
                    <div className="card-body">
                        <div className="d-flex">
                        <h5 className="card-title">{note.title}</h5> <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("deleted sucessfully","danger")}}  ></i>

                        <i className="fa-solid fa-pen-to-square " onClick={()=>{updateNote(note)}} ></i>
                        </div>
                        <p className="card-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt aspernatur, dignissimos sed minus consectetur repellendus. Sunt enim quam repudiandae veritatis.{note.description}</p>
                      
                    </div>
            </div>

        </div>
    )
}

export default Noteitem
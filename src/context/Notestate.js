
  import noteContext  from "./Notecontext.js";
import { useState } from "react";
// now we are d are going to define which we will use

const NoteState=(props)=>{
  const host='http://localhost:5000'
    const notesinitial=[]
      const [notes, setNotes] = useState(notesinitial)
      // get all notes
      const getallNotes=async()=>{
        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
          method:'GET',
          headers:{
            'content-type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        })
        const json=await response.json()
        console.log(json)
        setNotes(json)
        
      }

    //   add a notes
    const addNotes= async(title,description,tag)=>{
      const response=await fetch(`${host}/api/notes/addallnotes`,{
        method:'POST',
        headers:{
          'content-type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      })
      const json=  await response.json();
      console.log(json)

      const note=json;
      setNotes(notes.concat(note))


    }


    // delete note
    const deleteNote=async(id)=>{
      const response=await fetch(`${host}/api/notes/deletenotes/${id}`,{
        method:'DELETE',
        headers:{
          'content-type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
      })
      const json=response.json();
      console.log(json)

        console.log("notes deleted sucessfully " +id)
         const  newNotes=notes.filter((note)=>{ return note._id!==id})
        setNotes(newNotes)
    }

    // edit a note
    const editNote= async (id,title,description,tag)=>{
      
      const response=await fetch(`${host}/api/notes/updatenotes/${id}`,{
        method:'PUT',
        headers:{
          'content-type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({title,description,tag})
      })
      const json=  await response.json();
      console.log(json)
      
      let  newNotes=JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id===id){
          newNotes[index].title=title;  
          newNotes[index].description=description;
          newNotes[index].tag=tag
          break;
        }
      }
      setNotes(newNotes)
        

    }


    return(
        <noteContext.Provider  value={{notes,setNotes,addNotes,deleteNote,getallNotes,editNote}}>
            {props.children}
        </noteContext.Provider>
        


    )

}
export default NoteState
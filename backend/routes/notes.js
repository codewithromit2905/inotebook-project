const express=require('express')
const router=express.Router()
const Fetchuser=require('../middleware/Fetchuser')
const Notes=require('../model/Notes')
const { body, validationResult } = require('express-validator');
// fetch alll notes 
router.get('/fetchallnotes', Fetchuser, async(req,res)=>{
    try {
        const notes= await Notes.find({user:req.user.id})
        res.json(notes) 
          
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some eroor occured");
    }
})

// we are going to add all notes 
router.post('/addallnotes', Fetchuser,[
    body('title' ,"enter enter a valid title").isLength({min:5}),
    body('description',"please enter valid decsription ").isLength({min:3})

] ,async(req,res)=>{
    try {
    const {title,description,tag}=req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note= new Notes({
        title,description,tag,user:req.user.id
    })
    res.json(note)
    const saveNote= await note.save()
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some eroor occured");
        
    }
})


// update notes
router.put('/updatenotes/:id', Fetchuser,async(req,res)=>{
    const{title,description,tag}=req.body
    const newNote={}
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

// find a notes and update it
let note=  await Notes.findById(req.params.id)
if(!note){
      return res.status(401).json("request not found")
}
if(note.user.toString() !==req.user.id){
    return res.status(401).json("request not found")
}
note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})
res.json({note})
})


// delete note and 
router.delete('/deletenotes/:id', Fetchuser,async(req,res)=>{
    const{title,description,tag}=req.body
   

// find a notes and update it
let note=  await Notes.findById(req.params.id)
if(!note){
      return res.status(401).json("request not found")
}
if(note.user.toString() !==req.user.id){
    return res.status(401).json("request not found")
}
note=await Notes.findByIdAndDelete(req.params.id, {new:true})
res.json({"sucess":"note has been deleted",note:note})
})




module.exports=router
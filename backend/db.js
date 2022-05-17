// coonnect database with mangose
const mangoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/inotebook"

const connecttoMongo=()=>{
    mangoose.connect(mongoURI,()=>{
        console.log("connected to mongo sucessfully ")
    })
}

module.exports=connecttoMongo
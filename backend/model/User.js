const mongoose=require('mongoose')
const{Schema}=mongoose


// now we are creating userscema
const Userschema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
      
    },
    timestamp:{
        type:Date,
        default:Date.now
        
    }




})
const user=mongoose.model('User',Userschema)

module.exports=user
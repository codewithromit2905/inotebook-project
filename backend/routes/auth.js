const express=require('express')
const router=express.Router()
const User=require('../model/User')
const { body, validationResult } = require('express-validator');
// we are imporating validation tool 
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const user = require('../model/User');
const  JWT_SECRET="CODEWITHRONNY@2905"
const Fetchuser=require('../middleware/Fetchuser')
const Notes=require('../model/Notes')
// create user 
router.post('/createuser',[
    body('email' ,"please enter valid email").isEmail(),
    body('name' ,"enter minimum 3 charcter").isLength({min:5}),
    body('password',"please enter minimum 3 ").isLength({min:3})

], async(req,res)=>{
    let success=false
    // if there are error retun bad requerst
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //   lets check same email is there
    try {
        let user=   await  User.findOne({email:req.body.email})
       
        if (user){
            return res.status(400).json({ success,errors:"sorry a user with same email is alredy exit"})
        }
    //   hasing a password
        const salt = bcrypt.genSaltSync(10);

      const   secPass=await bcrypt.hash(req.body.password,salt)
       user=await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      })
const data={
    user:{
        id:user.id
    }
}
// creating auth-token 
      const authtoken=jwt.sign(data,JWT_SECRET)
      success=true
      res.json({success,authtoken})
          
      } catch (error) {
          console.error(error.message);
          res.status(500).send("some eroor occured");
      }

})


// verify a new user 
router.post('/login',[
    body('email' ,"please enter valid email").isEmail(),
    body('password',"please can not be exmplt ").exists()

], async(req,res)=>{  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
const  {email,password}=req.body
try {
    let user=  await User.findOne({email})
    if(!user){
        return res.status(400).json({errors:"please try to login with correct credential "})
    }
    const passwordcompare= await bcrypt.compare(password,user.password)
    if (!passwordcompare){
        let  success=false
        return res.status(400).json({  success, errors:"please try to login with correct credential "})

    }
    const data={
        user:{
            id:user.id
        }
    }
    // creating auth-token 
          const authtoken=jwt.sign(data,JWT_SECRET)
          let success=true;
          res.json({success,authtoken})
            
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("some eroor occured"); 
}
})
// get login user detail

router.post('/getuser',Fetchuser,async(req,res)=>{ 


    try {
       const  userID=req.user.id
        const user=await User.findById(userID).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some eroor occured"); 

    }

 })
    



module.exports=router
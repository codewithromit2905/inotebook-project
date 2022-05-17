const jwt = require('jsonwebtoken');
const  JWT_SECRET="CODEWITHRONNY@2905"

const Fetchuser=(req, res, next)=>{
// get the user from jwy token
const token=req.header('auth-token')
if (!token){
   res.status(401).send({Error:"please  authenticate with valid token"})
}
try {
const data=jwt.verify(token,JWT_SECRET)
req.user=data.user
    next()
} catch (error) {
    return res.status(401).send({Error:"please  authenticate with valid token"})
}
    
}



module.exports= Fetchuser
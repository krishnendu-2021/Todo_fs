const jwt = require('jsonwebtoken');
const JWT_SECRET = "Kris@hh" 

const fetchUser =(req, res , next)=>{
    // get the user from jwt toket and add id to the req object
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error : "access denied , invaild token"})
    }
    try {
        const data = jwt.verify(token,  JWT_SECRET);
        req.user = data.user;   
        // to pass the fucntion to next function ,, in this case async(req,res)
        next();
        
    } catch (error) {
        res.status(401).send({error : "access denied , invaild token"})
    }
}

module.exports = fetchUser;
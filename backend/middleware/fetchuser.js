const jwt = require('jsonwebtoken');
const JWT_SECRET = "AbdulIsThe$King"

const fetchuser = async (req, res, next) =>{
    try {
        const token = req.header("auth-token");
        if(!token){
            return res.status(401).json({error: "Invalid token"})
        }
        const data = await jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({error: "Pls authenticate using a valid token"})
    }
}

module.exports = fetchuser;
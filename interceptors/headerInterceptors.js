const CONSTANTS = require("../constants/errorMessages")

const headerInterceptors = () =>{
    const checkAuthForRetrieval = (req,res,next) => {
        console.log()
        if(req.headers['x-auth-token']!='abcd'){
            res.status(400).send(CONSTANTS.httpResponse)
        }else{
            next()
        }
    }
    return{
        checkAuthForRetrieval
    }
}

module.exports = headerInterceptors
const CONSTANTS = require("../constants/errorMessages")

const headerInterceptors = () =>{
    const checkAuthForRetrieval = (req,res,next) => {
        if(req.headers['x-auth-token']!='abcd'){
            res.status(400).json(CONSTANTS.httpResponse)
        }else{
            next()
        }
    }
    return{
        checkAuthForRetrieval
    }
}

module.exports = headerInterceptors
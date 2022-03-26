

const headerInterceptors = () =>{
    const checkAuthForRetrieval = (req,res,next) => {
        console.log()
        if(req.headers['x-auth-token']!='abcd'){
            res.status(400).send("Don't play play leh")
        }else{
            next()
        }
    }
    return{
        checkAuthForRetrieval
    }
}

module.exports = headerInterceptors
const CONSTANTS = require("../constants/errorMessages")
const surveySchema = require("../Schema/SurveySchema")

const bodyValidator = () =>{
    const validBody = (req,res,next) => {
        if(!req.body.surveyQuestions){
            console.log(`surveyQuestions not found in request.`,req.body)
            res.status(400).send(CONSTANTS.httpResponse)
        }else{
            next()
        }
    }
    return{
        validBody
    }
}


module.exports = bodyValidator
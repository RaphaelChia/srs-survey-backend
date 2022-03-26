const router = require('express').Router();
const SurveyStudent = require('../models/SurveyStudent.model');
const { v4: uuidv4 } = require('uuid');
const hIntercep = require('../interceptors/headerInterceptors')()


router.route('/get-json').get(hIntercep.checkAuthForRetrieval,(req,res)=>{
    SurveyStudent.find()
    .then(surveys=>res.json(surveys))
    .catch(err=>res.status(400).send(err))
})

router.route('/get-csv').get(hIntercep.checkAuthForRetrieval,(req,res)=>{
    var start = new Date()
    var spentMap = {}
    var finalList = []
    SurveyStudent.find()
    .then(async studentSurveySubmission =>{

        //The logic is:
        //Prepare a map
        //Loop through every single survey submission
        //Check the map for existence of the submissionId key. If dont exist, means its a new one.
        //Add the submissionId to the map as key, and value to number 1.
        //After adding, go pull everything in the db with that submissionId. 
        //submissionId for that particular one is officially processed.
        //Repeat.
        for(idx in studentSurveySubmission){
            var e = studentSurveySubmission[idx]
            if(spentMap.hasOwnProperty(e.submissionId)){ //If alr exist
                continue
            }
            spentMap[e.submissionId]=1
            var relatedSurveySubmissionList = await SurveyStudent.find({'submissionId':e.submissionId}) 
            var csString = relatedSurveySubmissionList[0].createdAt+","+(relatedSurveySubmissionList[0].submissionId!==undefined?relatedSurveySubmissionList[0].submissionId:"blank")+","
            for(idy in relatedSurveySubmissionList){
                var qn = relatedSurveySubmissionList[idy]
                csString +=(qn.name+","+qn.response.join('|').replace(",","|")+",")
            }
            finalList.push(csString)
        }
        var end = new Date()
        console.log(`This is the time elapsed (sec): ${(end-start)/1000}`)
        res.send(finalList.join("\n"))
        // res.json(studentSurveySubmission)
    })
    .catch(err=>res.status(400).json('Error: '+ err))
})


router.route('/add').post((req,res)=>{
    try{
        let docList = []
        const uuid = uuidv4()
        req.body.surveyQuestions.forEach(element => {
            var newSurveyStudent = new SurveyStudent({
                name:element.name,
                response:element.response,
                type:element.type,
                ip:req.body.ip,
                countryOrigin:req.body.countryOrigin,
                countryOriginCode:req.body.countryOriginCode,
                submissionId:uuid
            })
            docList.push(newSurveyStudent)
        });
        // console.log(docList)
        SurveyStudent.insertMany(docList)
        .then(()=>{res.json("student survey added to the database!")})
        .catch(err=>{
            console.log("Insert failed leh. "+ err)
            res.status(400).json('Error: '+err)
        })
    }catch(err){
        console.log("Wah what happened orh? "+err)
        res.status(400).json("Don't play play leh")
    }


})

module.exports = router
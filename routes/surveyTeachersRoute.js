const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const errorMessage = require('../constants/errorMessages');
const regex = require('../constants/regex');
const successMessage = require('../constants/successMessages');
const bodyInterceptor = require('../interceptors/bodyValidatorInterceptors')();
const MailingEntry = require('../models/MailEntry.model');
const SurveyTeacher = require('../models/SurveyTeachers.model');
const hIntercep = require('../interceptors/headerInterceptors')()


router.route('/get-json').get(hIntercep.checkAuthForRetrieval,(req,res)=>{
    SurveyTeacher.find()
    .then(surveys=>res.json(surveys))
    .catch(err=>res.status(400).send(err))
})

router.route('/get-csv').get(hIntercep.checkAuthForRetrieval,(req,res)=>{
    var start = new Date()
    var spentMap = {}
    var finalList = []
    SurveyTeacher.find()
    .then(async teacherSurveySubmission =>{

        //The logic is:
        //Prepare a map
        //Loop through every single survey submission
        //Check the map for existence of the submissionId key. If dont exist, means its a new one.
        //Add the submissionId to the map as key, and value to number 1.
        //After adding, go pull everything in the db with that submissionId. 
        //submissionId for that particular one is officially processed.
        //Repeat.
        for(idx in teacherSurveySubmission){
            var e = teacherSurveySubmission[idx]
            if(spentMap.hasOwnProperty(e.submissionId)){ //If alr exist
                continue
            }
            spentMap[e.submissionId]=1
            var relatedSurveySubmissionList = await SurveyTeacher.find({'submissionId':e.submissionId}) 
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
        // res.json(teacherSurveySubmission)
    })
    .catch(err=>res.status(400).json('Error: '+ err))
})


router.route('/add').post(bodyInterceptor.validBody,(req,res)=>{
    try{
        let docList = []
        const uuid = uuidv4()
        req.body.surveyQuestions.forEach(element => {
            var newSurveyTeacher = new SurveyTeacher({
                name:element.name,
                response:element.response,
                type:element.type,
                ip:req.body.ip,
                countryOrigin:req.body.countryOrigin,
                countryOriginCode:req.body.countryOriginCode,
                submissionId:uuid
            })
            docList.push(newSurveyTeacher)
            
        });
        // console.log(docList)
        SurveyTeacher.insertMany(docList)
        .then(()=>{res.json("Teacher survey added to the database!")})
        .catch(err=>{
            console.log("Insert failed leh. "+ err)
            res.status(400).json('Error: '+err)
        })
    }catch(err){
        console.log("Wah what happened? "+err)
        res.status(400).json(errorMessage.httpResponse)
    }
})

router.route('/mailing-list').post(async (req,res)=>{
    try{
        var mailEntry = new MailingEntry({
            email:req.body.email
        })
        
        //Checking if email already exist dont bother adding
        var email = await MailingEntry.findOne({email:`${req.body.email}`})
        if(email){
            res.json("Successfully added teacher to mailing list")
            return
        }
        MailingEntry.create(mailEntry)
        .then(success=>res.json("Successfully added teacher to mailing list"))
        .catch(error=>{
            console.log(`Error adding ${req.body.email} to mailing list. ${error}`)
            res.status(400).json(errorMessage.httpResponse)
        })
    } catch(err){
        console.log(`Error adding to mailing list. ${err}`)
        res.status(400).json(errorMessage.httpResponse)
    }
})


router.route('/mailing-list').delete(async(req,res)=>{
    try{
        if(!req.body.email){
            console.log(`${errorMessage.malformedResponse} from `,req.socket.remoteAddress, req.body)
            res.status(400).json(errorMessage.httpResponse)
            return
        }
        MailingEntry.deleteOne({email:`${req.body.email}`})
        .then(success=>res.json(`${req.body.email} ${successMessage.mailerDeleteSuccess}`))
        .catch(error=>res.status(400).json(`${req.body.email}`))

    }catch(err){
        console.log(`Error removing from mailing list. ${err}`)
        res.status(400).json(errorMessage.httpResponse)
    }
})
module.exports = router
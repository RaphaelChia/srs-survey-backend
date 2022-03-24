const router = require('express').Router();
const SurveyStudent = require('../models/SurveyStudent.model');
const { v4: uuidv4 } = require('uuid');

router.route('/').get((req,res)=>{
    SurveyStudent.find()
    .then(users =>{res.json(users)})
    .catch(err=>res.status(400).json('Error: '+ err))
})


router.route('/add').post((req,res)=>{
    try{
        let docList = []
        req.body.surveyQuestions.forEach(element => {
            var newSurveyStudent = new SurveyStudent({
                name:element.name,
                response:element.response,
                type:element.type,
                ip:req.body.ip,
                countryOrigin:req.body.countryOrigin,
                countryOriginCode:req.body.countryOriginCode,
                submissionId:uuidv4()
            })
            docList.push(newSurveyStudent)
        });
    
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
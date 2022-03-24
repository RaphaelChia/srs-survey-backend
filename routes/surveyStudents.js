const router = require('express').Router();
const SurveyStudent = require('../models/SurveyStudent.model');

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
                ip:req.body.ip
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
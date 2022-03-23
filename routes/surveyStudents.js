const router = require('express').Router();
const SurveyStudent = require('../models/SurveyStudent.model');

router.route('/').get((req,res)=>{
    SurveyStudent.find()
    .then(users =>{res.json(users)})
    .catch(err=>res.status(400).json('Error: '+ err))
})


router.route('/add').post((req,res)=>{

    let docList = []

    console.log(req.body)
    req.body.surveyQuestions.forEach(element => {
        var newSurveyStudent = new SurveyStudent({
            name:element.name,
            response:element.response,
            type:element.type
        })
        docList.push(newSurveyStudent)
    });

    console.log(docList)
    SurveyStudent.insertMany(docList)

    .then(()=>{res.json("student survey added!")})
    .catch(err=>res.status(400).json('Error: '+err))
})

module.exports = router
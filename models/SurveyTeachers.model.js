const mongoose = require('mongoose');
const surveySchema = require('../Schema/SurveySchema');
const Schema = mongoose.Schema;

const surveyTeacherSchema = new Schema(surveySchema,{
    timestamps:true,
})


const SurveyTeacher = mongoose.model('SurveyTeacher',surveyTeacherSchema)
module.exports = SurveyTeacher
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const surveyTeacherSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    response:{
        type:Array,
        required:true
    },
    type:{
        type:Number,
        required:true
    },
    ip:{
        type:String
    },
    countryOrigin:{
        type:String
    },
    countryOriginCode:{
        type:String
    },
    submissionId:{
        type:String
    }
},{
    timestamps:true,
})


const SurveyTeacher = mongoose.model('SurveyTeacher',surveyTeacherSchema)
module.exports = SurveyTeacher
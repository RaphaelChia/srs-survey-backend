const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const surveyStudentSchema = new Schema({
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
    }
},{
    timestamps:true,
})

// const surveyStudentSchema = new Schema({
//     surveyQuestions:[surveyQuestion]
// },{
//     timestamps:true,
// })

const SurveyStudent = mongoose.model('SurveyStudent',surveyStudentSchema)
module.exports = SurveyStudent
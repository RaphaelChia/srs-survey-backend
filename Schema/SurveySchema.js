const { notEmptyValidator } = require("../validators/notEmptyValidator")

const surveySchema = {
    name:{
        type:String,
        required:true,
        trim:true,
        validate:notEmptyValidator
    },
    response:{
        type:Array,
        required:true,
        validate:notEmptyValidator,
        default:undefined
    },
    type:{
        type:Number,
        required:true,
        validate:notEmptyValidator
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
}

module.exports = surveySchema
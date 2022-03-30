const mongoose = require('mongoose');
const regex = require('../constants/regex');
const Schema = mongoose.Schema;

const mailingEntrySchema = new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        validate:{
            validator:(v)=>{
                return regex.email.test(v)
            },
            message: props=> `${props.value} is not a valid email.`
        }
    },
})




const MailingEntry = mongoose.model('Mailinglist',mailingEntrySchema)
module.exports = MailingEntry
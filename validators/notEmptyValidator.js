const SchemaValidators = {
    notEmptyValidator:{
        validator:(v)=>{
            return !(v==undefined || v==null)
        },
        message: props=> `${props.value} is malformed.`
    }
}

module.exports = SchemaValidators
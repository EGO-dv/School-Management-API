const mongoose = require("mongoose")

const lecturerSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    phoneNumber:{type:String,required:true,unique:true},
    email:{type:String,unique:true,required:true},
    courseLecturing:[{type:mongoose.Schema.Types.ObjectId,
        ref:""
    }]
})
const mongoose=require("mongoose");
const certificateFieldSchema=mongoose.Schema({
    recieverName:{
        type:String,
        required:[true,"Please Enter Your Reciever's Name"]
    },
    trainingProgramTitle:{
        type:String,
        required:[true,"Please Enter trainingProgramTitle"]
    },
    orgName:{
        type:String,
        required:[true,"Please Enter your orgName"]
    },
    trainingStartDate:{
        type:Date,
        required:[true,"Please Enter your trainingStartDate"]
    },
    trainingEndDate:{
        type:Date,
        required:[true,"Please Enter your trainingEndDate"]
    },
    templateUrl:{
        type:String,
        required:[true,"Please Enter your templateUrl"]
    },
    certificateID:{
        type:String,
        required:[true,"Please Enter your certificateID"]
    }
  
})

//const certificateFieldModel=mongoose.model("certificateFieldCollection",certificateFieldSchema);
module.exports=certificateFieldSchema;
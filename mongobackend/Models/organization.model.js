const mongoose=require("mongoose");
const organizationSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter product name"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your password"]
    },
    contact:{
        type:Number,
        required:[true,"Please Enter your contact"]
    },
    organizationUrl:{
        type:String,
        required:[true,"Please Enter your contact"]
    },
    jobTitle:{
        type:String,
        required:[true,"Please Enter your contact"]
    }
  
})
const organizationModel=mongoose.model("organizationCollection",organizationSchema);
module.exports=organizationModel;
const mongoose=require("mongoose");
const individualUserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter product name"]
    },
    password:{
        type:String
       
    },
    contact:{
        type:Number,
        required:[true,"Please Enter your contact"]
    }
  
})
const individualUserModel=mongoose.model("individualUsersCollection",individualUserSchema);
module.exports=individualUserModel;
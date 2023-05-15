// database connection
const mongoose=require("mongoose")
const env=require("dotenv")
env.config()
mongoose.set('strictQuery', false);
const connectDB=()=>{
    mongoose.connect(process.env.mongoose_url)
}


module.exports = connectDB

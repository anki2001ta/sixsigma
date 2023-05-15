const express=require("express")
const env=require("dotenv")
env.config()
const app=express()
const dummyRoute=require('./Routes/dummyRoute')
const connectDB=require("./Config/credDB")
const cors=require("cors");
app.use(express.json())
app.use(
    cors({
        origin:"*"
    })
)



app.use("/",dummyRoute)

 
//connect database
app.listen(process.env.port,async()=>{
  try{
    await connectDB()
    console.log(`Database connected and listening to http://localhost:${process.env.port}`)
  }
  catch(err){
    console.log(err)
    console.log("App is not listening")
  }
})
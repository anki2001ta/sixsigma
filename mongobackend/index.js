const express=require("express")
const env=require("dotenv")
env.config()
const app=express()
const connectDB=require("./Config/credDB")
const authenticateRoute=require("./Middleware/Authentication.middleware")
const {auth}=require("./Middleware/Authentication.middleware")
const cors=require("cors");
app.use(express.json())
app.use(
    cors({
        origin:"*"
    })
)


app.use(auth)
app.use("/",authenticateRoute)


app.get("/get",((req,res)=>{
  res.send("user")
})
)
 
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
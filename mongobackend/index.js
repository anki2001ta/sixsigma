const express = require("express");
const env = require("dotenv");
env.config();
const app = express();
const connectDB = require("./Config/credDB");
const authenticateRoute = require("./Routes/userRoute");
const auth=require("./Middleware/Authentication.middleware")
const cors = require("cors");
const postdata = require("./Routes/dummyRoute"); 

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);


app.use("/", authenticateRoute);
app.use(auth); // all the routes below this face auth.
app.use("/",postdata);

//connect database
app.listen(process.env.PORT, async () => {
  try {
    await connectDB();
    console.log(
      `Database connected and listening to http://localhost:${process.env.PORT}`
    );
  } catch (err) {
    console.log(err);
    console.log("App is not listening");
  }
});

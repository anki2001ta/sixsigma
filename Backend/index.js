const cors = require("cors");
const express = require("express");
const userRoute=require("./Routes/userRoute")
const app = express();
app.use(cors());
app.use(express.json());
app.use("/",userRoute)

app.listen(4500, () => console.log("Server started on port 4500"));

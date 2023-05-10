const cors = require("cors");
const express = require("express");
const userRoute=require("./Routes/userRoute")
const app = express();
app.use(cors());
app.use(express.json());
app.use("/",userRoute)

app.listen(5000, () => console.log("Server started on port 5000"));

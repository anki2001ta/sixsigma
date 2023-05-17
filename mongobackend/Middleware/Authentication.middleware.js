const JWT = require("jsonwebtoken");
require("dotenv").config();


const auth = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
//   console.log("tokennnnnnnnn",req.headers.cookie.split(";")[2]);
  let xyztoken = req.headers.cookie.split(";")[2];
//   console.log("abctoken",xyztoken.split("=")[1]);
let maintoken = xyztoken.split("=")[1];
  if (maintoken) {
    const decoded = JWT.verify(maintoken, process.env.SEC_KEY);
    
    if (decoded) {
      const userID = decoded.userID;
      req.body.userID = userID;
      next();
    } else {
      res.status(400).send({ message: "User Not Found(verified), Try Logging In" });
    }
  } else {
    res.status(400).send({ message: "User Not Found, Try Logging In" });
  }
};
module.exports = auth;

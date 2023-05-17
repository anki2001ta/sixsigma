const JWT = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    try {
        let maintoken = req.headers.cookie.split("=")[1];
        if (maintoken) {
          const decoded = JWT.verify(maintoken, process.env.SEC_KEY);
      
          if (decoded) {
            const userID = decoded.userID;
            req.body.userID = userID;
            next();
          } else {
            res
              .status(400)
              .send({ message: "User Not Found(verified), Try Logging In" });
          }
        } else {
          res.status(400).send({ message: "User Not Found, Try Logging In" });
        }
    } catch (error) {
        // console.log("req.headers.cookie",req.headers.cookie)
        console.log("error",error);
        res.send("authentication.middleware error",error)
    }
};
module.exports = auth;

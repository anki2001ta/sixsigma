const env = require("dotenv");
env.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OrganizationModel = require("../Models/organization.model");
//const IndividualUserModel = require("../Models/individualUser.model");

const organizationSignup = async (req, res) => {
  try {
    let data = await OrganizationModel.find({ email: req.body.email });
    if (data.length > 0) {
      res.status(200).send({ msg: "User Already Exist" });
    } else {
      bcrypt.hash(req.body.password, 4, async (err, hash) => {
        if (err) {
          res.status(500).send({ msg: "Something went wrong !" });
        }
        req.body.password = hash;
        req.body.administration = false;
        await OrganizationModel.create(req.body);
        res.status(200).send({ msg: "User registered Successfully" });
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Failed to create new user" });
  }
};

const organizationLogin = async (req, res) => {
  try {
    let data = await OrganizationModel.find({ email: req.body.email });
    if (data.length <= 0) {
      res.status(200).send({ msg: "User not found" });
    } else {
      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        if (err) {
          res.status(500).send({ msg: "Something went wrong !" });
        } else if (result) {
          // console.log("result", result);
          const xyztoken = jwt.sign(
            { userID: data[0]._id },
            process.env.SEC_KEY,
            {
              expiresIn: "1h",
              // (err, token) => {
              // let temp = data[0];
              // temp.password = "***********";
              // res.status(200).cookie("token", token);
              // const cookieOptions = {
              //   maxAge:  1000, // 24 hours in milliseconds
              //   httpOnly: true,
              //   expires: new Date(Date.now() + 10000 + 5 * 60 * 60 * 1000 + 0.5 * 60 * 60 * 1000), // Expiration date
              // };
              // res.set('Set-Cookie', `token=${token}; Max-Age=${cookieOptions.maxAge}; HttpOnly; Expires=${cookieOptions.expires.toUTCString()}`);

              // setTimeout(() =>{
              //   console.log("hi")
              // },10000);

              // res.status(200).send({
              //   msg: "User login Successfully",
              //   token: token,
              //   user: temp,
              // });
              // res.send("Cookie Set");
              // res.cookie("token", "sometoken");
              // req.session.views = token
              // res.setHeader("token", "sometoken");
              // console.log("req.session.views");
              // req.sessionOptions.maxAge = req.session.key
            }
          );

          // const cookieOptions = {
          //   maxAge: 1000, // 24 hours in milliseconds
          //   httpOnly: true,
          //   expires: new Date(
          //     Date.now() + 1000 + 5 * 60 * 60 * 1000 + 0.5 * 60 * 60 * 1000
          //   ), // Expiration date
          // };
          // res.set(
          //   "Set-Cookie",
          //   `token=${xyztoken}; Max-Age=${
          //     cookieOptions.maxAge
          //   }; HttpOnly; Expires=${cookieOptions.expires.toUTCString()}`
          // );

          const xyz = res.cookie("token", xyztoken, {
            httpOnly: true,
            // expires: new Date(
            //   Date.now() + 1000 + 5 * 60 * 60 * 1000 + 0.5 * 60 * 60 * 1000
            // ),
            // secure:true,
            maxAge: 5000,
            // signed:true
          });

          // const expiryTime = getExpiryTimeFromCookie(cookie);
          // console.log("expiryTime",expiryTime);

          console.log("xyz", xyz);

          res.status(200).send({
            msg: "token is set in cookie",
          });
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Failed to login" });
  }
};

module.exports = { organizationLogin, organizationSignup };

//! imp
//   expires: new Date(Date.now() + 10000 + 5 * 60 * 60 * 1000 + 0.5 * 60 * 60 * 1000), // Expiration date for cookie

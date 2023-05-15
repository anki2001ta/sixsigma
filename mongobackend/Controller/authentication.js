const env = require("dotenv");
env.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OrganizationModel = require("../Models/organization.model");
const IndividualUserModel = require("../Models/individualUser.model");

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
        req.body.password = undefined; 
        req.body.administration = false;
        await OrganizationModel.create(req.body);
        res.status(200).send({ msg: "Organization registered Successfully" });
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Failed to create new organization" });
  }
};

const individualSignup = async (req, res) => {
  try {
    let data = await IndividualUserModel.find({ email: req.body.email });
    if (data.length > 0) {
      res.status(200).send({ msg: "User Already Exist" });
    } else {
      bcrypt.hash(req.body.password, 4, async (err, hash) => {
        if (err) {
          res.status(500).send({ msg: "Something went wrong !" });
        }
        req.body.password = undefined; // Remove the password field
        req.body.administration = false;
        await IndividualUserModel.create(req.body);
        res.status(200).send({ msg: "Individual user registered Successfully" });
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Failed to create new individual user" });
  }
};

const organizationLogin = async (req, res) => {
  try {
    let data = await OrganizationModel.find({ email: req.body.email });
    if (data.length <= 0) {
      res.status(200).send({ msg: "User not found" });
    } else {
      // Perform the password comparison without storing the password in the database
      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        if (err) {
          res.status(500).send({ msg: "Something went wrong !" });
        } else if (result) {
          jwt.sign(
            { userID: data[0]._id },
            process.env.SEC_KEY,
            (err, token) => {
              let temp = data[0];
              temp.password = "***********";
              res
                .status(200)
                .send({
                  msg: "Organization login Successfully",
                  token: token,
                  user: temp,
                });
            }
          );
        } else {
          res.status(200).send({ msg: "Invalid credentials" });
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Failed to login" });
  }
};

const individualLogin = async (req, res) => {
    try {
      const email = req.body.email;
  
      // Check if the user with the given email exists
      const user = await IndividualUserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).send({ msg: "User not found" });
      }
  
      // Perform any additional authentication checks here
  
      // If the email is valid and any additional checks pass, return success response
      return res.status(200).send({ msg: "User authenticated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Failed to login" });
    }
  };
  

  module.exports={individualSignup,individualLogin,organizationLogin,organizationSignup}
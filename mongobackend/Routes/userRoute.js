const express = require("express");
const router = express.Router();
const {organizationLogin,organizationSignup}=require("../Controller/authentication")

// Organization Signup route
router.post("/organization/signup",organizationSignup);



// Organization Login route
router.post("/organization/login",organizationLogin);



module.exports = router;

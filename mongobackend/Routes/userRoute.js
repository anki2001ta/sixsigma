const express = require("express");
const router = express.Router();
const {individualSignup,individualLogin,organizationLogin,organizationSignup}=require("../Controller/authentication")

// Organization Signup route
router.post("/organization/signup",organizationSignup);

// Individual User Signup route
router.post("/individual/signup",individualSignup);

// Organization Login route
router.post("/organization/login",organizationLogin);

// Individual User Login route
router.post("/individual/login",individualLogin);

module.exports = router;

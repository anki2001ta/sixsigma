const express = require("express");
const router = express.Router();
const {organizationLogin,organizationSignup}=require("../Controller/authentication");
const auth = require("../Middleware/Authentication.middleware");
const PostJob= require("../Controller/organization")
// Organization Signup route
router.post("/organization/signup",organizationSignup);

// Organization Login route
router.post("/organization/login",organizationLogin);
//router.get("/check",PostJob)


module.exports = router;

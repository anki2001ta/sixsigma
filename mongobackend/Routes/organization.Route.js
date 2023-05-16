const express = require('express');
const router = express.Router();
const {setCredendialAttributes}=require("../Controller/organization")

router.post("/organization/certificateCredential",setCredendialAttributes)

module.exports=router
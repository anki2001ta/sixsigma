const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.send("Welcome User");
  } catch (error) {
    if(error){
        res.send(error);
    }
  }
});

module.exports = router;

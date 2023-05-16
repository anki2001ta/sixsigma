const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
   res.send("Welcome to mongoDb")
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports=router
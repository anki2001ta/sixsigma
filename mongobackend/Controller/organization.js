const express = require('express');
const app = express();
const additionalData = []; 
app.use(express.json());

// Define the API route
app.post('/api/compare', (req, res) => {
  const { name, role, email, additionalFields } = req.body; // Extract user data from the request body

  // Check if the mandatory fields are present
  if (!name || !role || !email) {
    return res.status(400).json({ error: 'Missing mandatory fields' });
  }

  // Compare the mandatory fields with user data
  if (name === req.body.name && role === req.body.role && email === req.body.email) {
    // Store the additional data in the array
    additionalData.push(additionalFields);

    // Return a success message
    return res.json({ message: 'Data stored successfully' });
  } else {
    // Return an error if the mandatory fields don't match
    return res.status(400).json({ error: 'Invalid mandatory fields' });
  }
});

const getCredential=async(req,ree)=>{
    try{


    }
    catch(error){

    }
}



const PostJob=async(req,res)=>{
    try {
        const t=await JobModel.create(req.body);
        res.send(t)
    } catch (error) {
      console.log(error)
        res.status(500).send({ msg: "Failed to post the job" });
    }
}
const certicateSchema = require('../Models/certificateInfo.model');
const setCredendialAttributes = (req, res) => {
  const orgUserdata = req.body;
  const customAttributes = [];
  const missingFields = [];

  for (const [key, value] of Object.entries(orgUserdata)) {
    if (!(key in certicateSchema)) {
      customAttributes.push({ key, value });
    }
  }
  
  console.log(customAttributes)

  for (const [key, schema] of Object.entries(certicateSchema)) {
    if (schema.required && !(key in orgUserdata)) {
      missingFields.push(key);
    }
  }
  if (missingFields.length > 0) {
    res.status(400).json({ message: 'Missing fields', missingFields });
  } else if (customAttributes.length === 0) {
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'User data is valid', customAttributes });
  }
};




const PostJob=async(req,res)=>{
  console.log("welcome")
}
module.exports=PostJob

const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser())
const uuid = require('uuid');
const admin = require('../Configuration/firebaseConfig');
const localStorage=require('localStorage')
const { getAuth, signInWithEmailAndPassword } = require ("firebase/auth");
const { initializeApp } = require ("firebase/app")
const authMiddleware = require('../Middleware/middleware');
const shortid = require("shortid")


// initializing firebase sdk for the login route
const firebaseConfig = {
  apiKey: "AIzaSyDyt1wViokCJGqv8i8-h-P8qYcAq1LIjsI",
  authDomain: "credentialtest-229d2.firebaseapp.com",
  databaseURL: "https://credentialtest-229d2-default-rtdb.firebaseio.com",
  projectId: "credentialtest-229d2",
  storageBucket: "credentialtest-229d2.appspot.com",
  messagingSenderId: "139651428308",
  appId: "1:139651428308:web:a0b24c5705888e569e3041",
  measurementId: "G-YGE8YDFRST"
};
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Sign in the user
   await signInWithEmailAndPassword(Auth, email, password);
    res.send({msg:"Login Successfull"})
    
  } catch (error) {
    console.log('Error authenticating user:', error);
    res.status(500).send({ message: 'Error authenticating user' })
  }
})





router.post('/signup', (req, res) => {
    let { email, password, displayName, courses,completed,id } = req.body;
    admin.auth().createUser({
      email,
      password,
      displayName,
      courses,
      completed,
      id
    }).then((userRecord) => {
      const db = admin.database();
      const userRef = db.ref('users').child(userRecord.uid);
      id=userRecord.uid
      console.log(id)
      const userData = {
        email: userRecord.email,
        name: userRecord.displayName,
        courses,
        completed,
        id
       
      };
    
     
    
      userRef.set(userData).then(() => {
        console.log('User data saved successfully');
        //res.send(userData.uid)
        res.status(201).send({ message: 'User created successfully' });
      }).catch((error) => {
        console.log('Error saving user data:', error);
        res.status(500).send({ message: 'Error saving user data' });
      });
    }).catch((error) => {
      console.log('Error creating user:', error);
      res.status(500).send({ message: 'Error creating user' });
    });
});


router.get('/dashboard/:uid', (req, res) => {
  const uid = req.params.uid;
  const db = admin.database();
  const userRef = db.ref('users').child(uid);
  console.log('Fetching user data for uid:', uid);
  userRef.once('value', (snapshot) => {
    const userData = snapshot.val();
    console.log('Retrieved user data:', userData);
    res.send(userData);
  }, (error) => {
    console.log('Error retrieving user data:', error);
    res.status(500).send({ message: 'Error retrieving user data' });
  });
});





router.get('/image', async (req, res) => {
  const storageRef = admin.storage().bucket().file('sixsigma123y/sixsigma000.png');
  const [url] = await storageRef.getSignedUrl({
  action: 'read',
  expires: '03-17-2025'
  })
  res.send({ url })
  console.log({url})
  
  })




router.get('/generate', (req, res) => {
  const options = {course:20}
  const id = shortid.generate(options);
  res.send(id);
});






  module.exports=router

    

 // if (Array.isArray(courses,completed)) {
      //   userData.courses = {};
      //   courses.forEach((course, index) => {
      //     userData.courses[`course${index+1}`] = course;
      //   });
      // } else {
      //   userData.courses = courses;
      //   userData.courses = completed;
      // }


  // {
  //   "email":"asiria@gmail.com",
  //   "password":"asi99uoh",
  //   "displayName":"asi",
  //   "courses":[
  //     {
  //       "coursename":"red",
  //       "completed":"12-09-2023"
  //     },
  //      {
  //       "coursename":"red",
  //       "completed":"12-09-2023"
  //     }
      
  //     ]
  // }

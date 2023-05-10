const express = require('express');
const router = express.Router();
const admin = require('../Configuration/firebaseConfig');

const { getAuth, signInWithEmailAndPassword } = require ("firebase/auth");
const { initializeApp } = require ("firebase/app")
const authMiddleware = require('../Middleware/middleware');

const createCustomToken = async (uid) => {
  try {
    const customToken = await firebase.auth().createCustomToken(uid);
    return customToken;
  } catch (error) {
    console.log('Error creating custom token:', error);
    throw new Error('Error creating custom token');
  }
}
router.post('/signup', async (req, res) => {
  const { email, password, displayName, issuer ,courses="",completed="" } = req.body;

  try {
    // Create a new user account
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    const db = admin.database();
    const userRef = db.ref('users').child(userRecord.uid);
  
    const userData = {
      email: userRecord.email,
      name: userRecord.displayName,
      issuer
    };
    
    if (Array.isArray(courses,completed)) {
      userData.courses = {};
      
      courses.forEach((course, index) => {
        userData.courses[`course${index+1}`] =course;
      });
      
    } else {
      userData.courses = courses;
      userData.courses = completed;
    }

    await userRef.set(userData);

    // Create a custom token for the authenticated user
    const customToken = await createCustomToken(userRecord.uid);

    // Return the custom token to the client
    res.status(200).send({ token: customToken });
  } catch (error) {
    console.log('Error creating user:', error);
    res.status(500).send({ message: 'Error creating user' });
  }
});


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
    const userCredential = await signInWithEmailAndPassword(Auth, email, password);
    const user = userCredential.user;
    
    // Create a custom token for the authenticated user
    const customToken = await createCustomToken(user.uid);

    // Return the custom token to the client
    res.status(200).send({ token: customToken });
  } catch (error) {
    console.log('Error authenticating user:', error);
    res.status(500).send({ message: 'Error authenticating user' })
  }
})
router.post('/signup', (req, res) => {
    const { email, password, displayName, courses="",completed="" } = req.body;
    admin.auth().createUser({
      email,
      password,
      displayName
    }).then((userRecord) => {
      const db = admin.database();
      const userRef = db.ref('users').child(userRecord.uid);
    
      const userData = {
        email: userRecord.email,
        name: userRecord.displayName,
       
      };
    
      if (Array.isArray(courses,completed)) {
        userData.courses = {};
        courses.forEach((course, index) => {
          userData.courses[`course${index+1}`] = course;
        });
      } else {
        userData.courses = courses;
        userData.courses = completed;
      }
    
      userRef.set(userData).then(() => {
        console.log('User data saved successfully');
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



// router.get('/dashboard',authMiddleware, (req, res) => {
//   const db = admin.database();
//   const userRef = db.ref('users').child(req.user.uid);
  
//   console.log('Fetching user data for uid:', req.user.uid);
//   userRef.once('value', (snapshot) => {
//     const userData = snapshot.val();
//     console.log('Retrieved user data:', userData);
//     res.send(userData);
//   }, (error) => {
//     console.log('Error retrieving user data:', error);
//     res.status(500).send({ message: 'Error retrieving user data' });
//   });
// });






  
 
  
  
  
  
  
  
  
  

  



router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const db = admin.database();
  const userRef = db.ref('users').child(req.session.user.uid);
  userRef.once('value', (snapshot) => {
    const userData = snapshot.val();
    res.render('dashboard', { userData });
  }, (error) => {
    console.log('Error fetching user data:', error);
    res.status(500).send({ message: 'Error fetching user data' });
  });
});




  

  
  module.exports=router

    





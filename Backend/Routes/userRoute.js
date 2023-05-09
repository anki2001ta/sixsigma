const express = require('express');
const router = express.Router();
const admin = require('../Configuration/firebaseConfig');

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


router.get("/data", async (req, res) => {
  try {
    // const name = req.query.name;
    // const title = req.query.title;
    const db = getDatabase();
    let datas = ref(db, "userdata");

    console.log("datas",datas)

    // if (name && title) {
    //   datas = query(datas, orderByChild("name"),equalTo(name));
    //   datas = query(datas, orderByChild("title"),equalTo(title));
    // } else if (name) {
    //   datas = query(datas, orderByChild("name"),equalTo(name));
    // } else if (title) {
    //   datas = query(datas, orderByChild("title"),equalTo(title));
    // }

    const snapshot = await get(datas);
    const data = snapshot.val();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving data from the database.");
  }
});


  
  
 
  
  
  
  
  
  
  
  
  



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




module.exports = router;

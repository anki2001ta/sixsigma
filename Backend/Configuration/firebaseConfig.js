let admin = require("firebase-admin");
let serviceAccount = require("./credential.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://credentialtest-229d2-default-rtdb.firebaseio.com",
  storageBucket: 'gs://credentialtest-229d2.appspot.com/'
});

module.exports=admin
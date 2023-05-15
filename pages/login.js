import Link from "next/link";
import styles from "@/styles/pages/Forms.module.css";
//import { ShowPassword } from "@/helpers/icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";

import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const firebase = {
    apiKey: "AIzaSyDyt1wViokCJGqv8i8-h-P8qYcAq1LIjsI",
    authDomain: "credentialtest-229d2.firebaseapp.com",
    databaseURL: "https://credentialtest-229d2-default-rtdb.firebaseio.com",
    projectId: "credentialtest-229d2",
    storageBucket: "credentialtest-229d2.appspot.com",
    messagingSenderId: "139651428308",
    appId: "1:139651428308:web:a0b24c5705888e569e3041",
    measurementId: "G-YGE8YDFRST",
  };

  // Initialize Firebase
  const app = initializeApp(firebase);
  const auth = getAuth(app);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth,email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
        localStorage.setItem("uid",user.uid);
        if(user){
          router.push('/certificate')
        }else{
          console.log('wrong id')
        }
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        console.log(errorCode, errorMessage);
        alert("user not found");
      });
  };

  return (
    <div className={``}>
      <div className={styles.title}>
        <h2>Sign in</h2>
      </div>
      <div className={styles.form}>
        <div className={styles.email}>
          <input
            className={styles.input_email}
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email address"
          />
          {/* {console.log("email",{email})} */}
          <label className={styles.label}>
            <span className={styles.error}>
              Please enter your email address*
            </span>
          </label>
        </div>

        <div className={styles.password}>
          <input
            className={styles.input_password}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <label className={styles.label}>
            <span className={styles.error}>Please enter your password*</span>
          </label>
        </div>

        <a href="">Forgot password?</a>
        <Link
          className={`btn_primary`}
          href="/certificate"
          onClick={handleSubmit}
        >
          Signin
        </Link>
      </div>
    </div>
  );
};

export default Login;

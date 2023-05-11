import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Signup.module.css";
import Draggable from "react-draggable";
import axios from 'axios';
import Login from "./login";
import OrgSignup from "./signup";

export default function Index() {


  return (
    <div className={styles.container}>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign up for our website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <OrgSignup/>
    </div>
  );
}

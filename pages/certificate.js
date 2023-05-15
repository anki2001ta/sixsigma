import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Signup.module.css";
import Draggable from "react-draggable";
import axios from "axios";

export default function Certificate() {
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [courses, setCourses] = useState("");
  const [completed, setCompleted] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setusername] = useState();
  // const [issuer, setissuer] = useState();
  const [belt, setbelt] = useState();
  const [date, setdate] = useState();
  const [email, setEmail] = useState("");
  const [userid, setuserid] = useState("");

  const issuer = "Six Sigma";
  const beltid = "000";

  const uid = localStorage.getItem("uid");

  useEffect(() => {
    try {
      const response = axios
        .get(`http://localhost:5000/dashboard/${uid}`)
        .then((res) => {
          console.log("data", res.data);
          setusername(res.data.name);
          setbelt(res.data.courses);
          setdate(res.data.completed);

        });
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign up for our website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.wrapper}`}>
        <div className={`${styles.left}`}>
          <div className={`${styles.top} `}>
            <p className={`${styles.title} `}>Issuer</p>
            {/* <Profile
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              name="CloudRedux"
              admin="admin"
            /> */}
            <p>{issuer}</p>
          </div>
          <div className={`${styles.middle} `}>
            <p className={`${styles.title} `}>Issued to</p>

            {/* <Profile
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              name="Swarup"
              admin="student"
            /> */}
            <p>{username}</p>
          </div>
          <div className={`${styles.bottom} `}>
            <div>
              <p>Issued on</p>
              <p>{date}</p>
            </div>
            <div>
              <p>Expires on</p>
              <p>Does not expire</p>
            </div>
            <div>
              <a
                href={`http://localhost:3000/issuer/groups/create/preview/?id=${userid}&username=${username}&beltid=${beltid}&belt=${belt}&date=${date}&email=${email}`}
                target="_blank"
                // onClick={}
              >
                Claim Certificate
              </a>
            </div>
          </div>
        </div>
        <div className={`${styles.right} `}>
          <div id="downloadcert" className={`${styles.cert}`}>
            <img
              className={`${styles.certimg}`}
              src="https://firebasestorage.googleapis.com/v0/b/crediorg-4c8f3.appspot.com/o/SixSigma.png?alt=media&token=2a4c13e9-4fa1-463c-8cee-8ea3228e9cd8"
              alt="black"
              width="800"
              height="550"
            />
            <div
              className={`${styles.certcontentname}`}
              // style={setCoordinatesName}
            >
              <p className={`${styles.certname}`}>{username}</p>
            </div>
            <div
              className={`${styles.certcontentbelt}`}
              // style={setCoordinatesBelt}
            >
              <p className={`${styles.certname}`}>Lean Six Sigma {belt} Belt</p>
            </div>

            <div className={`${styles.certcontentdate}`}>
              <p className={`${styles.certname}`}>
                {date}
                {/* x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)} */}
              </p>
            </div>
          </div>
          <div>
            {/* <Link className={`${styles.a} btn_secondary`} href="">
            Share Credential
          </Link>
          <Link className={` ${styles.a} btn_secondary`} href="">
            Verify Credential
          </Link> */}
            {/* <a href={`http://localhost:3001/?id=${userid}&username=${username}&belt=${belt}`} target="_blank">Claim Certificate</a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

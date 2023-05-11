import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "@/styles/Signup.module.css";

const SignupForm = () => {
  const [issuer, setIssuer] = useState("");
  const [issuerId, setIssuerId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseTemplate, setCourseTemplate] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [completed, setCompleted] = useState("");
  const [url, setUrl] = useState("");

  const router = useRouter();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:5000/signup", {
  //       email,
  //       password,
  //       displayName,
  //       courses,
  //       completed,
  //     });
  //     console.log("response", response);
  //     router.push("/login");
  //     localStorage.setItem("uid", response.data.uid);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4500/data", {
        issuer,
        issuerId,
        courseName,
        courseId,
        courseTemplate,
        email,
        displayName,
        userId,
        completed,
      });

      // const res = await axios.get("http://localhost:4500/data").then((res) => {
      //   console.log("res",res);
      // });

      console.log("response", response.data);
      setUrl(response.data.alldata.url)
      // console.log("res", res.data);

      // router.push("/login");
      // localStorage.setItem("uid", response.data.uid);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.main} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="issuer">
            Issuer:
          </label>

          <input
            className={styles.input}
            type="text"
            id="issuer"
            value={issuer}
            onChange={(event) => setIssuer(event.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="issuer">
            Issuer Id:
          </label>

          <input
            className={styles.input}
            type="text"
            id="issuerid"
            value={issuerId}
            onChange={(event) => setIssuerId(event.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="issuer">
            course Name:
          </label>

          <input
            className={styles.input}
            type="text"
            id="issuer"
            value={courseName}
            onChange={(event) => setCourseName(event.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="issuer">
            course Id:
          </label>

          <input
            className={styles.input}
            type="text"
            id="issuer"
            value={courseId}
            onChange={(event) => setCourseId(event.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="issuerid">
            course Template:
          </label>

          <input
            className={styles.input}
            type="text"
            id="issuerid"
            value={courseTemplate}
            onChange={(event) => setCourseTemplate(event.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            email
          </label>

          <input
            className={styles.input}
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="displayName">
            user id:
          </label>

          <input
            className={styles.input}
            type="text"
            id="displayName"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="courses">
            Name:
          </label>

          <input
            className={styles.input}
            type="text"
            id="coursesname"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="completed">
            Date of Completion:
          </label>

          <input
            className={styles.input}
            type="text"
            id="completed"
            value={completed}
            onChange={(event) => setCompleted(event.target.value)}
          />
        </div>

        <button
          className={styles.signup_button}
          type="submit"
          // onClick={handleReq}
        >
          Request
        </button>
        <Link className=""
          target="_blank"
          href={`http://localhost:3000/certificate/${issuerId}/${courseId}/${courseTemplate}/?&issuerId=${issuerId}&displayName=${displayName}&courseId=${courseId}&courseName=${courseName}&date=${completed}&email=${email}&url=${url}`}
          >
          {`http://localhost:3000/certification/${issuerId}/${courseId}`}
        </Link>
      </form>
    </div>
  );
};

export default SignupForm;

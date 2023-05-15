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
  const [url, setUrl] = useState();
  const [data, setData] = useState();
  const [showUrl, setShowUrl] = useState(false);

  // const router = useRouter();

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
      await axios
        .post("http://localhost:4500/data", {
          issuer,
          issuerId,
          courseName,
          courseId,
          courseTemplate,
          email,
          displayName,
          userId,
          completed,
        })
        .then((res) => {
          if (res) {
            setShowUrl(true);
          }
          // console.log("res.data.alldata", res.data.alldata);
          setData(res.data.alldata);
          console.log("res.data.alldata.url", res.data.alldata.url);
          setUrl(res.data.alldata.url);
        });
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
        {showUrl ? (
          <Link
            className={styles.signup_button}
            target="_blank"
            href={`http://localhost:3000/certificate/${data.issuerId}/${data.courseId}/${data.courseTemplate}/?&issuerId=${data.issuerId}&displayName=${data.displayName}&courseId=${data.courseId}&courseName=${data.courseName}&date=${data.completed}&email=${data.email}`}
          >
            View Certificate
            {/* {`http://localhost:3000/certification/${issuerId}/${courseId}`} */}
          </Link>
        ) : (
          <></>
        )}

        {/* <Link href={`${url}`}>{url}</Link> */}
      </form>
    </div>
  );
};

export default SignupForm;

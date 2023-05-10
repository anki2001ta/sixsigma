import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "@/styles/Signup.module.css";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [courses, setCourses] = useState("");
  const [completed, setCompleted] = useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
        displayName,
        courses,
        completed,
      });
      console.log("response", response);
      router.push("/login");
      localStorage.setItem("uid", response.data.uid);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.main} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email:
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

        <div  className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>

          <input
            className={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="displayName">
            Display Name:
          </label>

          <input
            className={styles.input}
            type="text"
            id="displayName"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="courses">
            Courses:
          </label>

          <input
            className={styles.input}
            type="text"
            id="courses"
            value={courses}
            onChange={(event) => setCourses(event.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="completed">
            Completed:
          </label>

          <input
            className={styles.input}
            type="text"
            id="completed"
            value={completed}
            onChange={(event) => setCompleted(event.target.value)}
          />
        </div>

        <button className={styles.signup_button} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupForm;

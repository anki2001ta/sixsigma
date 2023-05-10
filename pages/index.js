import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Signup.module.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [courses, setCourses] = useState('');
  const [completed, setCompleted] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  return (
    <div className={styles.container}>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Sign up for our website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Sign Up</h1>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form className={styles.form} >
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              minLength="6"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="displayName" className={styles.label}>
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="courses" className={styles.label}>
              Courses (comma separated)
            </label>
            <input
              type="text"
              id="courses"
              name="courses"
              value={courses}
              onChange={(e) => setCourses(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
          <label htmlFor="completed" className={styles.label}>
          Completed Courses (comma separated)
        </label>
        <input
          type="text"
          id="completed"
          name="completed"
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.signup_button} >
        Sign Up
      </button>

      <p className={styles.text}>
        Already have an account?{' '}
        <Link href="/login">
          {/* <a className={styles.link}>Log In</a> */}
        </Link>
      </p>
    </form>
  </main>
</div>
  )}
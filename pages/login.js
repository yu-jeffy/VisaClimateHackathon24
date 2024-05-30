import styles from '../styles/index.module.css';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import LogInForm from '../components/LogInForm';

const CustomHead = () => (
  <Head>
    <title>Login Page</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="description" content="This is the Login Page" />
  </Head>
);

function LoginPage() {
  return (
    <div className={styles.container}>
      <CustomHead />
      <LogInForm />
    </div>
  );
}

export default LoginPage;
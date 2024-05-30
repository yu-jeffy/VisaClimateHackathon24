import styles from '../styles/index.module.css';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import SignUpForm from '../components/SignUpForm';

const CustomHead = () => (
  <Head>
    <title>Sign Up Page</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="description" content="This is the Sign Up Page" />
  </Head>
);

function SignUpPage() {
  return (
    <div className={styles.container}>
      <CustomHead />
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
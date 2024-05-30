import styles from '../styles/index.module.css';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';

const CustomHead = () => (
  <Head>
    <title>Home Page</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="description" content="This is the Home Page" />
  </Head>
);

function Home() {
  return (
    <div className={styles.container}>
      <CustomHead />
      <h1>Home Page</h1>
      <p>This is the Home Page</p>
    </div>
  );
}

export default Home;
// pages/index.js

import styles from '../styles/index.module.css';
import Link from 'next/link';
import Head from 'next/head';

const CustomHead = () => (
  <Head>
    <title>EcoEarn - Home</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="description" content="EcoEarn: Incentivized earnings and rewards program for sustainable spending and grocery shopping." />
  </Head>
);

function Home() {
  return (
    <div className={styles.container}>
      <CustomHead />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Earn Rewards for Sustainable Spending</h2>
          <p>Join EcoEarn today and get rewarded for making eco-friendly choices while shopping.</p>
          <button className={styles.ctaButton}>Get Started</button>
        </section>
        <section className={styles.features}>
          <div className={styles.feature}>
            <h3>Track Your Impact</h3>
            <p>Monitor your eco-friendly purchases and see the positive impact you&apos;re making on the environment.</p>
          </div>
          <div className={styles.feature}>
            <h3>Earn Points</h3>
            <p>Collect points for every sustainable product you purchase. Redeem them for exclusive rewards.</p>
          </div>
          <div className={styles.feature}>
            <h3>Exclusive Discounts</h3>
            <p>Access special discounts and offers on eco-friendly products from our partner stores.</p>
          </div>
        </section>
        <section className={styles.rewards}>
          <h2>Rewards</h2>
          <div className={styles.rewardList}>
            <div className={styles.rewardItem}>
              <h4>Gift Cards</h4>
              <p>Redeem your points for gift cards from your favorite stores.</p>
            </div>
            <div className={styles.rewardItem}>
              <h4>Eco Products</h4>
              <p>Get eco-friendly products at discounted prices using your points.</p>
            </div>
            <div className={styles.rewardItem}>
              <h4>Charity Donations</h4>
              <p>Donate your points to support environmental causes and charities.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>© 2024 EcoEarn. All rights reserved.</p>
        <nav>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </nav>
      </footer>
    </div>
  );
}

export default Home;

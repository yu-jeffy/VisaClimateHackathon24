import styles from '../styles/index.module.css';
import ThreeScene from '../components/ThreeScene';

export default function Home() {
  return (
    <div className={styles.container}>

        <div className={styles.threeSceneContainer}> 
          <ThreeScene />
        </div>

      <main className={styles.main}>

        <h2 className={styles.subtitle}>Welcome to Re-VISA</h2>
        <p className={styles.text}>Your one-stop shop for all your grocery needs. Fresh, quality products at affordable prices.</p>

        <section id="products" className={styles.section}>
          <h3 className={styles.sectionTitle}>Our Products</h3>
          <p className={styles.text}>Explore our extensive collection of groceries, including fresh fruits and vegetables, dairy products, baked goods, and much more.</p>
        </section>

      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>&copy; 2024 Re-VISA Grocery Store. All rights reserved.</p>
      </footer>
      
    </div>
  );
}

import styles from '../styles/index.module.css';
import ThreeScene from '../components/ThreeScene';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Re-VISA Grocery Store</h1>
      </header>

      <main className={styles.main}>
        <h2 className={styles.subtitle}>Welcome to Re-VISA</h2>
        <p className={styles.text}>Your one-stop shop for all your grocery needs. Fresh, quality products at affordable prices.</p>
        <ThreeScene />
        <section id="about" className={styles.section}>
          <h3 className={styles.sectionTitle}>About Us</h3>
          <p className={styles.text}>At Re-VISA, we are committed to providing the best shopping experience. Our store offers a wide range of products from fresh produce to household essentials.</p>
        </section>
        <section id="products" className={styles.section}>
          <h3 className={styles.sectionTitle}>Our Products</h3>
          <p className={styles.text}>Explore our extensive collection of groceries, including fresh fruits and vegetables, dairy products, baked goods, and much more.</p>
        </section>
        <section id="contact" className={styles.section}>
          <h3 className={styles.sectionTitle}>Contact Us</h3>
          <p className={styles.text}>If you have any questions, feel free to reach out to us at <a href="mailto:contact@revisa.com" className={styles.link}>contact@revisa.com</a>.</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>&copy; 2024 Re-VISA Grocery Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

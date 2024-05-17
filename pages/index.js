// pages/index.js
import styles from '../styles/index.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Re-VISA Grocery Store</h1>
        <nav>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <h2>Welcome to Re-VISA</h2>
        <p>Your one-stop shop for all your grocery needs. Fresh, quality products at affordable prices.</p>
        <section id="about" className={styles.section}>
          <h3>About Us</h3>
          <p>At Re-VISA, we are committed to providing the best shopping experience. Our store offers a wide range of products from fresh produce to household essentials.</p>
        </section>
        <section id="products" className={styles.section}>
          <h3>Our Products</h3>
          <p>Explore our extensive collection of groceries, including fresh fruits and vegetables, dairy products, baked goods, and much more.</p>
        </section>
        <section id="contact" className={styles.section}>
          <h3>Contact Us</h3>
          <p>If you have any questions, feel free to reach out to us at <a href="mailto:contact@revisa.com">contact@revisa.com</a>.</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Re-VISA Grocery Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

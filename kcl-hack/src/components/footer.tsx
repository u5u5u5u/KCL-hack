import router from "next/router";
import styles from "./header.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div>
        <span className={styles.arrow} onClick={() => router.back()}></span>
      </div>
    </footer>
  );
};

export default Footer;

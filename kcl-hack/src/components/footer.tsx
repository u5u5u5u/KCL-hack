import router from "next/router";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.back} onClick={() => router.back()}>
        <span className={styles.arrow} />
      </div>
    </footer>
  );
};

export default Footer;

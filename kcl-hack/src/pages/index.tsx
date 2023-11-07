"use client";
import Link from "next/link";
import styles from "../components/index.module.css";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="wrapper">
          <h1 className={styles.main_title}>
            <span className={styles.main_title_text}>BAGOLA</span>;
          </h1>
          <div className="content">
            <Link href="/login">
              <button className="advance-button">logIn</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Link href="/home">
          <button>ホームへ</button>
        </Link>
      </div>
    </main>
  );
}

"use client";
import Link from "next/link";
import Button from "../components/button/button";
import styles from "../styles/index.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="wrapper">
          <div>
            <Image
              className={styles.logo_large}
              src="/BAGOLA_logo.png"
              width={1000}
              height={283}
              alt="BAGOLA"
            />
          </div>
          <div className="content">
            <Link href="../login">
              <Button label="logIn" />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.credit}>
        <a href="../credit">クレジット</a>
      </div>
      <span className={styles.yahho}>
        <a href="https://developer.yahoo.co.jp/sitemap/">
          Webサービス by Yahoo! JAPAN
        </a>
      </span>
    </main>
  );
}

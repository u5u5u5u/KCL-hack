"use client";

import Header from "../../components/header/header";
import styles from "../../styles/credit.module.css";
import Footer from "../../components/footer/footer";
import { useState, useEffect } from "react";

export default function Home() {
  const [JSvalied, setJSvalied] = useState<boolean>(false);

  useEffect(() => {
    setJSvalied(true);
  }, []);

  if (JSvalied) {
    return (
      <main>
        <Header children="Thank You For Playing" />
        <div className={styles.mid}>
          <div className={styles.midmid}>
            <h2 className={styles.big}>監督</h2>
            <p className={styles.phrase_semi}>;</p>
            <h2 className={styles.small}>コーディング</h2>
            <div className={styles.side}>
              <p className={styles.phrase_yugo}>U5</p>
              <p className={styles.phrase_hamu}>はむ</p>
              <p className={styles.phrase_semi_2}>;</p>
            </div>
          </div>
        </div>
        <span className={styles.yahho}>
          <a href="https://developer.yahoo.co.jp/sitemap/">
            Webサービス by Yahoo! JAPAN
          </a>
        </span>

        <Footer />
      </main>
    );
  } else {
    return (
      <main>
        <h1>Please enable javascript</h1>
        <div>
          さてはお前、javascriptをオフにしてこのメッセージを楽しんでいるな？
          <br />
          ということで、javascriptをオンにしてください。
        </div>
      </main>
    );
  }
}

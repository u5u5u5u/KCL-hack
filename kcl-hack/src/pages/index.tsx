"use client";
import Link from "next/link";
import Button from "../components/button/button";
import styles from "../styles/index.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [JSvalid, setJSvalid] = useState<boolean>(false);

  useEffect(() => {
    setJSvalid(true);
  }, []);

  if (JSvalid) {
    return (
      <main>
        <div className="container">
          <div className="wrapper">
            <div className={styles.image}>
              <Image
                className={styles.logo_large}
                src="/BAGOLA_logo.png"
                layout="intrinsic"
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
        <span className={styles.yahoo}>
          <a href="https://developer.yahoo.co.jp/sitemap/">
            Webサービス by Yahoo! JAPAN
          </a>
        </span>
      </main>
    );
  } else {
    return (
      <main>
        <h1>Please enable javascript</h1>
        <div>
          このゲームはjavascriptがないと動かないぜ。
          <br />
          ということで、javascriptをオンにしてください。
        </div>
      </main>
    );
  }
}

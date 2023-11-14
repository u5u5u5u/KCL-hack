"use client";
import Link from "next/link";
import Button from "../components/button";
import styles from "../components/index.module.css";
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
            <Link href="/google">
              <Button label="logIn" />
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

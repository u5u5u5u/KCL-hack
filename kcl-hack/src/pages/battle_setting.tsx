"use client";
import styles from "../components/battle_setting.module.css";
import Header from "../components/header";
import Button from "../components/button";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <main>
        <Header children="ちゃんと設定しようね" />
        <h2 className={styles.a}>準備中だよ！！</h2>
        <div className={styles.b}>
          <button className={styles.b}>+</button>♪
          <button className={styles.b}>-</button>
        </div>

        <Footer />
      </main>
    </>
  );
}

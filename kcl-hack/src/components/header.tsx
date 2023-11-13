import React, { ReactNode } from "react";
import Link from "next/link";
import router from "next/router";
import styles from "./header.module.css";

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className={styles.container}>
      <div>
        <span className={styles.arrow} onClick={() => router.back()}></span>
      </div>
      <div className={styles.title}>{children}</div>
      <div>
        <Link href="/home">
          <span className={styles.home}></span>
        </Link>
      </div>
    </header>
  );
};

export default Header;

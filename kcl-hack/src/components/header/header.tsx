import React, { ReactNode } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            className={styles.logo_pc}
            src="/BAGOLA_logo.png"
            layout="intrinsic"
            width={247}
            height={70}
            alt="BAGOLA"
          />
          <Image
            className={styles.logo_sp}
            src="/BAGOLA_small.png"
            layout="intrinsic"
            width={70}
            height={70}
            alt="BAGOLA"
          />
        </Link>
      </div>
      <div className={styles.title}>{children}</div>
      <div className={styles["home-button"]}>
        <Link href="../home">
          <span className={styles.home}></span>
        </Link>
      </div>
    </header>
  );
};

export default Header;

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
      <div>
        <Link href="/">
          <Image
            className={styles.logo_small}
            src="/BAGOLA_logo.png"
            width={247}
            height={70}
            alt="BAGOLA"
          />
        </Link>
      </div>
      <div className={styles.title}>{children}</div>
      <div className={styles.ml_175}>
        <Link href="../home">
          <span className={styles.home}></span>
        </Link>
      </div>
    </header>
  );
};

export default Header;

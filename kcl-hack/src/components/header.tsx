import React, { ReactNode } from "react";
import styles from "./header.module.css";
import Link from "next/link";

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <div>
      <Link href="/home">
        <span className={styles.arrow}></span>
      </Link>
    </div>
  );
};

export default Header;

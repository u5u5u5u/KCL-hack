import React, { ReactNode } from "react";
import router from "next/router";
import styles from "./header.module.css";

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <div>
      <span className={styles.arrow} onClick={() => router.back()}></span>
    </div>
  );
};

export default Header;

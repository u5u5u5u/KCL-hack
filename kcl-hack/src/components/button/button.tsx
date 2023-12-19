import React from "react";
import styles from "./button.module.css";

//適用ページ: src/pages/home/index.tsx
type ButtonProps = {
  label: string;
};

const Button = ({ label }: ButtonProps) => {
  return <button className={styles.button}>{label}</button>;
};

export default Button;

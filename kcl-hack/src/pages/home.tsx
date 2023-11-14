"use client";
import Link from "next/link";
import Header from "../components/header";
import Button from "../components/button";

export default function Home() {
  return (
    <main>
      <Header children="HOME" />
      <div className="container">
        <ul className="wrapper">
          <li className="content">
            <Link href="/profile">
              <Button label="PROFILE" />
            </Link>
          </li>
          <li className="content">
            <Link href="/scan/scan-select">
              <Button label="SCAN" />
            </Link>
          </li>
          <li className="content">
            <Link href="/battle">
              <Button label="BATTLE" />
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

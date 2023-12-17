"use client";
import Link from "next/link";
import Header from "../../components/header/header";
import Button from "../../components/button/button";

export default function Home() {
  return (
    <main>
      <Header children="HOME" />
      <div className="container">
        <ul className="wrapper">
          <li className="content">
            <Link href="/home/profile">
              <Button label="PROFILE" />
            </Link>
          </li>
          <li className="content">
            <Link href="/home/scan">
              <Button label="SCAN" />
            </Link>
          </li>
          <li className="content">
            <Link href="/home/battle">
              <Button label="BATTLE" />
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

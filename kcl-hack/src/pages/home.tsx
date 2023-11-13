"use client";
import Link from "next/link";
import Button from "../components/button";

export default function Home() {
  return (
    <main>
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
          <li className="content">
            <Link href="/hoge">
              <button className="advance-button">設定</button>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

"use client";
import Link from "next/link";
import Header from "../../../components/header/header";
import Button from "../../../components/button/button";
import Footer from "../../../components/footer/footer";

export default function Home() {
  return (
    <main>
      <Header children="BATTLE" />
      <div className="container">
        <ul className="wrapper">
          <li className="content">
            <Link href="/home/battle/matching">
              <Button label="Matching" />
            </Link>
          </li>

          <li className="content">
            <Link href="/home/battle/box">
              <Button label="Box" />
            </Link>
          </li>
          <li className="content">
            <Link href="/home/battle/set">
              <Button label="Setting" />
            </Link>
          </li>
        </ul>
      </div>
      <Footer />
    </main>
  );
}

"use client";
import Link from "next/link";
import Header from "../components/header";
import Button from "../components/button";
import Footer from "../components/footer";

export default function Home() {
  return (
    <main>
      <Header children="BATTLE" />
      <div className="container">
        <ul className="wrapper">
          <li className="content">
            <Link href="/matching">
              <Button label="Matching" />
            </Link>
          </li>

          <li className="content">
            <Link href="/Container">
              <Button label="Characters" />
            <Link href="/box">
              <Button label="Box" />
            </Link>
          </li>
          <li className="content">
            <Link href="/battle_setting">
              <Button label="Setting" />
            </Link>
          </li>
        </ul>
      </div>
      <Footer />
    </main>
  );
}

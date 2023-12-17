"use client";
import Link from "next/link";
import Header from "../../../components/header/header";
import Button from "../../../components/button/button";
import Footer from "../../../components/footer/footer";

export default function Home() {
  return (
    <main>
      <Header children="SCAN" />
      <div className="container">
        <div className="wrapper">
          <ul className="wrapper">
            <li className="content">
              <Link href="/home/scan/camera">
                <Button label="読み取り" />
              </Link>
            </li>
            <li className="content">
              <Link href="/home/scan/input">
                <Button label="入力" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}

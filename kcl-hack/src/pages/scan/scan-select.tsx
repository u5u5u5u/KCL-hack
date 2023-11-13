"use client";
import Link from "next/link";
import Header from "../../components/header";

export default function Home() {
  return (
    <main>
      <Header children="SCAN" />
      <div className="container">
        <div className="wrapper">
          <ul className="">
            <li className="content">
              <Link href="/camera">
                <button className="advance-button">読み取り</button>
              </Link>
            </li>
            <li className="content">
              <Link href="/scan/search">
                <button className="advance-button">入力</button>
              </Link>
            </li>
          </ul>
          <div className="text-3xl text-center my-10">
            <Link href="/home">
              <button>戻る</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

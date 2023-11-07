"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="wrapper">
          <h2 className="sub-title">SCAN</h2>
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

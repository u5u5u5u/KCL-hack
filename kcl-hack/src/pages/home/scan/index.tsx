"use client";
import Link from "next/link";
import Header from "../../../components/header/header";
import Button from "../../../components/button/button";
import Footer from "../../../components/footer/footer";
import { useState, useEffect } from "react";

export default function Home() {
  const [JSvalid, setJSvalid] = useState<boolean>(false);

  useEffect(() => {
    setJSvalid(true);
  }, []);

  if (JSvalid) {
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
  } else {
    return (
      <main>
        <h1>Please enable javascript</h1>
        <div>
          ん？このメッセージ誰が書いたって？そいつは秘密だ;
          <br />
          ということで、javascriptをオンにしてください。
        </div>
      </main>
    );
  }
}

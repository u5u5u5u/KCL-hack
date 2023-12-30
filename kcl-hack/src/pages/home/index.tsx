"use client";
import Link from "next/link";
import Header from "../../components/header/header";
import Button from "../../components/button/button";
import { useState, useEffect } from "react";

export default function Home() {
  const [JSvalid, setJSvalid] = useState<boolean>(false);

  useEffect(() => {
    setJSvalid(true);
  }, []);

  if (JSvalid) {
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
  } else {
    return (
      <main>
        <h1>Please enable javascript</h1>
        <div>
          おい、そこのお前!!そう、お前だ。javascript落としたぜ。
          <br />
          ということで、javascriptをオンにしてください。
        </div>
      </main>
    );
  }
}

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
  } else {
    return (
      <main>
        <h1>Please enable javascript</h1>
        <div>
          javascriptって3DSのブラウザでも使えるんだっけ？でもお前が使ってるのは3DSじゃないよな？
          <br />
          ということで、javascriptをオンにしてください。
        </div>
      </main>
    );
  }
}

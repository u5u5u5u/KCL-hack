"use client";
import React, { useState, ChangeEvent } from "react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  const [number, setNum] = useState<number>();

  const sendNum = () => {
    console.log(number);

    setNum("");
  };
  const changeNum = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setNum(event.target.value);
  };

  return (
    <main>
      <Header children="MATCHING" />
      <div className="container">
        <div className="wrapper">
          <form action="#" method="post">
            <div>
              <h2>ルームを探す</h2>
            </div>
            <div className="text-center">
              <label>
                <div>
                  <input
                    value={number}
                    onChange={changeNum}
                    placeholder="ルーム番号を入力"
                  />
                  <button className="button" onClick={sendNum}>
                    検索
                  </button>
                </div>
              </label>
            </div>
          </form>
          <div>
            <Link href="/battle_scene">
              <button>PLAY</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

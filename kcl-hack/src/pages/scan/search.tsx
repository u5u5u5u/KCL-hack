"use client";
import React, { useState } from "react";
import Link from "next/link";
import { YAHOO_API_KEY } from "../../constant/env";

export default function Home() {
  const [number, setNum] = useState<string>("");
  const [name, setNam] = useState<string>("");
  const [price, setPri] = useState<number>();
  const [image, setIma] = useState<string>("");

  const changeNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setNum(event.target.value);
  };

  async function fetchname() {
    try {
      const res = await fetch(
        `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${YAHOO_API_KEY}&jan_code=${number}`
      );
      if (!res.ok) {
        throw new Error("fetchに失敗しました");
      }
      const data = await res.json();
      console.log(data);
      setNam(data.hits[0].name);
      setPri(data.hits[0].price);
      setIma(data.hits[0].image.small);
    } catch (error) {
      console.error("エラーです:", error);
    }
  }

  const sendNum = () => {
    console.log(number);
    fetchname();
    setNam("");
    setNum("");
    setIma("");
    setPri(NaN);
  };

  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col">
          <h2 className="text-6xl text-center mb-10">
            <span className="font-mono">JANコード</span>を入力
          </h2>
          <div className="flex justify-center mb-6">
            <input
              className="text-6xl text-red-500 mr-10"
              type="text"
              value={number}
              onChange={changeNum}
            />
            <button className="text-5xl" onClick={sendNum}>
              送信
            </button>
          </div>
          <div>
            <img src={image} />
          </div>
          <p className="text-4xl my-5">商品名 : {name}</p>
          <p className="text-4xl">価格 : {price} 円</p>
          <div className="text-6xl text-center my-10">
            <button>登録</button>
          </div>
          <div className="text-3xl text-center my-5">
            <Link href="/home">
              <button>戻る</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

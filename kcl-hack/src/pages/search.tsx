"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [number, setNum] = useState<string>("Janコードを入力");
  const [name, setNam] = useState<string>("");
  const [price, setPri] = useState<number>();
  const [image, setIma] = useState<string>("");
  const yahookey = "dj00aiZpPVpKZG9FdVNJbW5SRCZzPWNvbnN1bWVyc2VjcmV0Jng9ZWE-";

  const changeNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setNum(event.target.value);
  };

  async function fetchname() {
    try {
      const res = await fetch(
        `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${yahookey}&jan_code=${number}`
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
      <Link href="/home">
        <button>homeへ戻る</button>
      </Link>
      <input type="text" value={number} onChange={changeNum} />
      <button onClick={sendNum}>送信</button>
      <p>
        <img src={image} />
      </p>
      <p>商品名 : {name}</p>
      <p>価格 : {price} 円</p>
    </main>
  );
}

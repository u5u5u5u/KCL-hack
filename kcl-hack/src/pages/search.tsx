"use client";
import React, { useState } from "react";
import Link from "next/link";
import { YAHHO_API_KEY } from "../constant/env";

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
        `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${YAHHO_API_KEY}&jan_code=${number}`
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
    console.log(YAHHO_API_KEY);
  };

  return (
    <main>
      <Link href="/">
        <button>pageへ戻る</button>
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

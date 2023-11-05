"use client";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { YAHOO_API_KEY } from "../../constant/env";
import { firebaseConfig } from "@/lib/firebase/firebase";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const UUID = localStorage.getItem("uuid");

export default function Home() {
  //status
  const [Hp, setHP] = useState<number>();
  const [Attack, setAttack] = useState<number>();
  const [Defence, setDefence] = useState<number>();
  const [Speed, setSpeed] = useState<number>();
  const [Jan, setJan] = useState<number>();

  const [number, setNum] = useState<number>();
  const [name, setNam] = useState<string>("");
  const [price, setPri] = useState<number>();
  const [image, setIma] = useState<string>("");

  function jan_get(jan: number) {
    var HP = 0;
    var attack = 0;
    var defence = 0;
    var speed = 0;
    if (jan > 99999999) {
      var jan013 = jan % 10;
      var jan012 = ((jan % 100) - jan013) / 10;
      var jan011 = ((jan % 1000) - jan013 - jan012 * 10) / 100;
      var jan010 = ((jan % 10000) - jan013 - jan012 * 10 - jan011 * 100) / 1000;
      var jan009 =
        ((jan % 100000) - jan013 - jan012 * 10 - jan011 * 100 - jan010 * 1000) /
        10000;
      var jan008 =
        ((jan % 1000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000) /
        100000;
      var jan007 =
        ((jan % 10000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000) /
        1000000;
      var jan006 =
        ((jan % 100000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000) /
        10000000;
      var jan005 =
        ((jan % 1000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000) /
        100000000;
      var jan004 =
        ((jan % 10000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000) /
        1000000000;
      var jan003 =
        ((jan % 100000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000 -
          jan004 * 1000000000) /
        10000000000;
      var jan002 =
        ((jan % 1000000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000 -
          jan004 * 1000000000 -
          jan003 * 10000000000) /
        100000000000;
      var jan001 =
        ((jan % 10000000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000 -
          jan004 * 1000000000 -
          jan003 * 10000000000 -
          jan002 * 100000000000) /
        1000000000000;

      HP =
        ((jan006 * 10000 +
          jan008 * 1000 +
          jan007 * 100 +
          jan009 * 10 +
          jan004) %
          1999) +
        1000;
      attack =
        ((jan005 * 10000 +
          jan001 * 1000 +
          jan011 * 100 +
          jan003 * 10 +
          jan012) %
          499) +
        100;
      defence =
        ((jan007 * 1000 + jan005 * 100 + jan002 * 10 + jan001) % 499) + 100;
      speed = ((jan008 * 100 + jan010 * 10 + jan005) % 97) + 50;
    }
    if (jan <= 99999999) {
      var jan013 = jan % 10;
      var jan012 = ((jan % 100) - jan013) / 10;
      var jan011 = ((jan % 1000) - jan013 - jan012 * 10) / 100;
      var jan010 = ((jan % 10000) - jan013 - jan012 * 10 - jan011 * 100) / 1000;
      var jan009 =
        ((jan % 100000) - jan013 - jan012 * 10 - jan011 * 100 - jan010 * 1000) /
        10000;
      var jan008 =
        ((jan % 1000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000) /
        100000;
      var jan007 =
        ((jan % 10000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000) /
        1000000;
      var jan006 =
        ((jan % 100000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000) /
        10000000;
      jan005 = 0;
      jan004 = 0;
      jan003 = 0;
      jan002 = 0;
      jan001 = 0;

      HP =
        ((jan012 * 10000 +
          jan008 * 1000 +
          jan007 * 100 +
          jan009 * 10 +
          jan009) %
          1999) +
        1000;
      attack =
        ((jan011 * 10000 +
          jan009 * 1000 +
          jan011 * 100 +
          jan010 * 10 +
          jan012) %
          499) +
        100;
      defence =
        ((jan007 * 1000 + jan007 * 100 + jan010 * 10 + jan008) % 499) + 100;
      speed = ((jan008 * 100 + jan010 * 10 + jan006) % 97) + 50;
    }
    setHP(HP);
    setAttack(attack);
    setDefence(defence);
    setSpeed(speed);
    setJan(number);
  }
  const changeNum = (event: ChangeEvent<HTMLInputElement>) => {
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
      jan_get(number);
    } catch (error) {
      console.error("エラーです:", error);
    }
  }

  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var statusRef = database.ref(`User/${UUID}/${Jan}/status`);

  const sendStatus = () => {
    console.log("send");
    statusRef.set({
      HP: Hp,
      Attack: Attack,
      Defence: Defence,
      Speed: Speed,
    });
  };

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
            <button onClick={sendStatus}>登録</button>
          </div>
          <div className="text-3xl text-center my-5">
            <Link href="/home">
              <button>戻る</button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h2>コード {Jan}</h2>

        <h2>HP {Hp}</h2>
        <h2>こうげき {Attack}</h2>
        <h2>ぼうぎょ {Defence}</h2>
        <h2>すばやさ {Speed}</h2>
      </div>
    </main>
  );
}

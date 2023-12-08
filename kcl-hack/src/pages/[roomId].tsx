"use client";
import { useRouter } from "next/router";
import React, { use, useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  update,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { Button } from "@mui/material";

var name1 = "Player";
var HP1 = 1000;
var attack1 = 600;
var defence1 = 100;
var speed1 = 40;
var name2 = "Rival";
var HP2 = 1000;
var attack2 = 200;
var defence2 = 900;
var speed2 = 40;
var damage1 = attack1 / defence2;
var damage2 = attack2 / defence1;
var strength1 = 500;
var strength2 = 300;
var HP1max = HP1;
var HP2max = HP2;
var zan;
var zanmax;

const w00 = () => {
  console.log("w00");
  HP2 -= damage1;
};
const w01 = () => {
  console.log("w01");
  HP2 -= damage1 / 2;
  HP1 += damage1 / 4;
};
const w02 = () => {
  console.log("w02");
  HP2 -= damage1 * 2;
  HP1 -= damage2;
};
const w03 = () => {
  console.log("w03");
  HP2 -= damage1 * 5;
  HP1 = 0;
};
const w04 = () => {
  console.log("w04");
  HP2 -= damage1 / 4;
  attack1 /= 2;
};
const w05 = () => {
  console.log("w05");
};
const w06 = () => {
  console.log("w06");
};
const w07 = () => {
  console.log("w07");
};
const w10 = () => {
  console.log("w10");
  HP1 += damage1;
};
const w11 = () => {
  console.log("w11");
  HP1 += HP1max / 2;
};
const w12 = () => {
  console.log("w12");
  HP1 = HP1max;
  defence1 /= 2;
  attack1 /= 2;
};
const w13 = () => {
  console.log("w13");
};
const w20 = () => {
  console.log("w20");
  attack2 *= 2;
  defence2 /= 2;
};
const w21 = () => {
  console.log("w21");
  defence1 *= 2;
};
const w22 = () => {
  console.log("w22");
  damage2 /= 3;
  defence2 /= 3;
};
const w23 = () => {
  console.log("w23");
  damage2 /= 2;
};
const w30 = () => {
  console.log("w30");
  zan = HP1;
  zanmax = HP1max;
  HP1 = HP2;
  HP1max = HP2max;
  HP2 = zan;
  HP2max = zanmax;
};
const w31 = () => {
  console.log("w31");
  attack1 *= 10;
  defence1 /= 10;
};
const w32 = () => {
  console.log("w32");
  HP1 = 1;
  HP2 = 1;
};
const w33 = () => {
  console.log("w33");
};

export default function Home() {
  const dbRef = ref(getDatabase());

  const router = useRouter();
  const roomId = router.query.roomId;

  async function leftRoom() {
    const UUid = await getUid();
    const db = getDatabase();
    get(child(dbRef, `Room/${roomId}/Member`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const Player1 = data.Member1;
          const Player2 = data.Member2;
          console.log(data.Member1);
          if (data.Member1 == UUid) {
            if (data.Member2 != null) {
              update(ref(db, `Room/${roomId}/Member`), {
                Member1: Player2,
                Member2: null,
              });
              console.log("Room left");
              router.push("/home");
            } else {
              remove(ref(db, `Room/${roomId}/`));
              console.log("Room deleted");
              console.log("Room left");
              router.push("/home");
            }
          }
          if (data.Member2 == UUid) {
            update(ref(db, `Room/${roomId}/Member`), {
              Member2: null,
            });
            console.log("Room left");
            router.push("/home");
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getUid() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      return user.uid;
    }
    return null;
  }

  return (
    <main>
      <h1>Room {roomId}</h1>
      <div className="p-10 text-blue-600 float-left">
        <h2 className="text-4xl p-10">{name1}</h2>
        <h2>
          HP {HP1} / {HP1max}
        </h2>
        <h2>こうげき {attack1}</h2>
        <h2>ぼうぎょ {defence1}</h2>
        <h2>すばやさ {speed1}</h2>
        <h2>あたえるダメージ {Math.trunc(damage1 * strength1)}</h2>
      </div>
      <div className="p-10 text-red-500 float-right">
        <h2 className="text-4xl p-10">{name2}</h2>
        <h2>
          HP {HP2} / {HP2max}
        </h2>
        <h2>こうげき {attack2}</h2>
        <h2>ぼうぎょ {defence2}</h2>
        <h2>すばやさ {speed2}</h2>
        <h2>あたえるダメージ {Math.trunc(damage2 * strength2)}</h2>
      </div>
      <div className="text-center p-10">
        <h2>コマンドを選んでください</h2>
      </div>
      <div className="text-center text-3xl">
        <Button onClick={w00}>たたく</Button>
        <Button onClick={w01}>ちゅーちゅーする</Button>
        <Button onClick={w02}>ぜんりょくこうげき</Button>
        <Button onClick={w03}>じばく</Button>
        <Button onClick={w04}>ぺちぺちする</Button>
        <Button onClick={w05}>w05</Button>
        <Button onClick={w06}>w06</Button>
        <Button onClick={w07}>w07</Button>
        <Button onClick={w10}>ねる</Button>
        <Button onClick={w11}>ぐっすりねる</Button>
        <Button onClick={w12}>ぜっき</Button>
        <Button onClick={w13}>w13</Button>
        <Button onClick={w20}>ちょうはつ</Button>
        <Button onClick={w21}>ひきこもる</Button>
        <Button onClick={w22}>こわいおにいさんをつれてくる</Button>
        <Button onClick={w23}>にらむ</Button>
        <Button onClick={w30}>ざんねんでしたー</Button>
        <Button onClick={w31}>ぎあちぇんじ</Button>
        <Button onClick={w32}>みちづれ</Button>
        <Button onClick={w33}>w33</Button>
      </div>
      <button onClick={leftRoom}>退室</button>
    </main>
  );
}

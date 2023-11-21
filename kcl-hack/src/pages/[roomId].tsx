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

var name1 = "Player";
var HP1max = 1000;

var attack1 = 600;
var defence1 = 100;
var speed1 = 40;
var name2 = "Rival";
var HP2max = 1000;

var attack2 = 200;
var defence2 = 900;
var speed2 = 40;
var damage1 = attack1 / defence2;
var damage2 = attack2 / defence1;
var strength1 = 500;
var strength2 = 300;

export default function Home() {
  const [HP1, setHP1] = useState<number>(1000);
  const [HP2, setHP2] = useState<number>(1000);
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

  function naguru() {
    if (HP1 > 0) {
      const changeHP1 = HP1 - 110;
      setHP1(changeHP1);
      if (changeHP1 < 0) {
        setHP1(0);
      }
    } else {
      setHP1(0);
    }
  }
  function keru() {
    const changeHP2 = HP2 - 1;
    setHP2(changeHP2);
  }
  function neru() {
    setHP1(HP1max);
    setHP2(HP2max);
  }
  return (
    <main>
      <h1>Room {roomId}</h1>
      <div className="p-10 text-blue-600 float-left">
        <h2 className="text-4xl p-10">{name1}</h2>
        <h2>
          HP {HP1}/{HP1max}
        </h2>
      </div>
      <div className="p-10 text-red-500 float-right">
        <h2 className="text-4xl p-10">{name2}</h2>
        <h2>
          HP {HP2}/{HP2max}
        </h2>
      </div>
      <div className="text-center p-10">
        <h2>コマンドを選んでください</h2>
      </div>
      <div className="text-center text-3xl">
        <button onClick={naguru}>なぐる</button>
        <button onClick={keru}>ける</button>
        <button onClick={neru}>ねる</button>

        <button onClick={leftRoom}>にげる</button>
      </div>
    </main>
  );
}

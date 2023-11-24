"use client";
import {useRouter} from 'next/router'
import React, { use, useState, useEffect} from "react";
import { getDatabase, ref, child, get, set, update, remove, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";

export default function Home() {
const [ButtleStatus, setButtleStatus] = useState<Object>();
const [redirect, setRedirect] = useState<boolean>(false);

const dbRef = ref(getDatabase());
const db = getDatabase();
const router = useRouter();
const roomId = router.query.roomId;



  useEffect(() => {
    const auth = getAuth();
      get(child(dbRef, `Room/${roomId}/ButtleStatus/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setButtleStatus(data);
            console.log(ButtleStatus);
          } else {
            console.log("No data available");
            setRedirect(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }, [redirect]);

 async function leftRoom ()  {
  const UUid = await getUid();
  const db = getDatabase();
  get(child(dbRef, `Room/${roomId}/Member`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const Player2 = data.Member2;
            console.log(data.Member1);
            if (data.Member1 == UUid) {
              if(data.Member2 != null){
              update(ref(db, `Room/${roomId}/Member`), {
                Member1: Player2,
                Member2: null
              });
              console.log("Room left");
              router.push("/home");
              }else{
                remove(ref(db, `Room/${roomId}/`) );
                console.log("Room deleted");
                console.log("Room left");
                router.push("/home");
              }
            }
            if (data.Member2 == UUid) {
              update(ref(db, `Room/${roomId}/Member`), {
                Member2: null
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
    };

    async function getUid () {
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
        <h2 className="text-4xl p-10"></h2>
        <h2>HP </h2>
        <h2>Attack </h2>
        <h2>Defence </h2>
        <h2>Speed </h2>
        <h2>あたえるダメージ </h2>
      </div>
      <div className="p-10 text-red-500 float-right">
        <h2 className="text-4xl p-10"></h2>
        <h2>HP </h2>
        <h2>こうげき</h2>
        <h2>ぼうぎょ</h2>
        <h2>すばやさ</h2>
        <h2>あたえるダメージ</h2>
      </div>
      <div className="text-center p-10">
        <h2>コマンドを選んでください</h2>
      </div>
      <div className="text-center text-3xl">
        <h2>なぐる</h2>
        <h2>ける</h2>
        <h2>にげる</h2>
      </div>
      <button onClick={leftRoom}>
        退室
      </button>
    </main>
  );
}

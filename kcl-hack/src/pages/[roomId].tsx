"use client";
import {useRouter} from 'next/router'
import React, { use, useState, useEffect} from "react";
import { getDatabase, ref, child, get, set, update, remove, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";

export default function Home() {
const [member1Status, setMember1Status] = useState<string>("null");
const [player1Status, setPlayer1Status] = useState<Object>();
const [player1HP, setPlayer1HP] = useState<number>(0); 
const [player1Attack, setPlayer1Attack] = useState<number>(0);
const [player1Defence, setPlayer1Defence] = useState<number>(0);
const [player1Speed, setPlayer1Speed] = useState<number>(0);
const [player1Img, setPlayer1Img] = useState<string>("");
const [member2Status, setMember2Status] = useState<string>("null");
const [player2Status, setPlayer2Status] = useState<Object>();
const [player2HP, setPlayer2HP] = useState<number>(0);
const [player2Attack, setPlayer2Attack] = useState<number>(0);
const [player2Defence, setPlayer2Defence] = useState<number>(0);
const [player2Speed, setPlayer2Speed] = useState<number>(0);
const [player2Img, setPlayer2Img] = useState<string>("");
const [redirect1, setRedirect1] = useState<boolean>(false);
const [redirect2, setRedirect2] = useState<boolean>(false);

const dbRef = ref(getDatabase());
const db = getDatabase();
const router = useRouter();
const roomId = router.query.roomId;



onValue(ref(db, `Room/${roomId}/MemberStatus/Member1`), (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  if (data != member1Status) {
    setMember1Status(data);
  }
});

onValue(ref(db, `Room/${roomId}/MemberStatus/Member2`), (snapshot) => {
  const data = snapshot.val();
  console.log(data);
  if (data != member2Status) {
    setMember2Status(data);
  }
});

useEffect(() => {
  if (member1Status == "ready" && member2Status == "ready") {
    setRedirect1(!redirect1);
    setRedirect2(!redirect2);
  }
}, [member1Status], [member2Status]);


  useEffect(() => {
    const auth = getAuth();
    console.log(roomId);
      const snapshot= get(child(dbRef, `Room/${roomId}/ButtleStatus/Member1/Status`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("available");
            const data = snapshot.val();
            setPlayer1Status(data);
            setPlayer1HP(data.HP);
            setPlayer1Attack(data.Attack);
            setPlayer1Defence(data.Defence);
            setPlayer1Speed(data.Speed);
            setPlayer1Img(data.Img);
          } else {
            console.log("No data available");
            setRedirect1(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }, [redirect1]);

  useEffect(() => {
    const auth = getAuth();
    console.log(roomId);
      const snapshot= get(child(dbRef, `Room/${roomId}/ButtleStatus/Member2/Status`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("available");
            const data = snapshot.val();
            setPlayer2Status(data);
            setPlayer2HP(data.HP);
            setPlayer2Attack(data.Attack);
            setPlayer2Defence(data.Defence);
            setPlayer2Speed(data.Speed);
            setPlayer2Img(data.Img);
          } else {
            console.log("No data available");
            setRedirect2(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }, [redirect2]);

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
              update(ref(db, `Room/${roomId}/ButtleStatus`), {
                Member1:player2Status,
                Member2:null
              });
              update(ref(db, `Room/${roomId}/MemberStatus`), {
                Member1:member2Status,
                Member2:null
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
              update(ref(db, `Room/${roomId}/ButtleStatus`), {
                Member2:null
              });
              update(ref(db, `Room/${roomId}/MemberStatus`), {
                Member2:null
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
        <div>{member1Status}</div>
        <h2>HP {player1HP}</h2>
        <h2>Attack {player1Attack}</h2>
        <h2>Defence {player1Defence}</h2>
        <h2>Speed {player1Speed}</h2>
        <h2>あたえるダメージ </h2>
      </div>
      <div className="p-10 text-red-500 float-right">
        <h2 className="text-4xl p-10"></h2>
        <div>{member2Status}</div>
        <h2>HP {player2HP}</h2>
        <h2>こうげき {player2Attack}</h2>
        <h2>ぼうぎょ {player2Defence}</h2>
        <h2>すばやさ {player2Speed}</h2>
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

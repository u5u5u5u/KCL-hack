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
  onValue,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { Button } from "@mui/material";

export default function Home() {
  const [whoIs, setWhoIs] = useState<string>("spectators");
  const [redirectWho, setRedirectWho] = useState<boolean>(false);
  const [member1Status, setMember1Status] = useState<string>("null");
  const [player1Status, setPlayer1Status] = useState<Object>();
  const [player1HP, setPlayer1HP] = useState<number>(1);
  const [player1Attack, setPlayer1Attack] = useState<number>(0);
  const [player1Defence, setPlayer1Defence] = useState<number>(0);
  const [player1Speed, setPlayer1Speed] = useState<number>(0);
  const [player1deltaHP, setPlayer1deltaHP] = useState<number>(0);
  const [player1deltaAttack, setPlayer1deltaAttack] = useState<number>(0);
  const [player1deltaDefence, setPlayer1deltaDefence] = useState<number>(0);
  const [player1deltaSpeed, setPlayer1deltaSpeed] = useState<number>(0);
  const [player1Img, setPlayer1Img] = useState<string>("");
  const [member2Status, setMember2Status] = useState<string>("null");
  const [player2Status, setPlayer2Status] = useState<Object>();
  const [player2HP, setPlayer2HP] = useState<number>(1);
  const [player2Attack, setPlayer2Attack] = useState<number>(0);
  const [player2Defence, setPlayer2Defence] = useState<number>(0);
  const [player2Speed, setPlayer2Speed] = useState<number>(0);
  const [player2deltaHP, setPlayer2deltaHP] = useState<number>(0);
  const [player2deltaAttack, setPlayer2deltaAttack] = useState<number>(0);
  const [player2deltaDefence, setPlayer2deltaDefence] = useState<number>(0);
  const [player2deltaSpeed, setPlayer2deltaSpeed] = useState<number>(0);
  const [player2Img, setPlayer2Img] = useState<string>("");
  const [startVisible, setStartVisible] = useState<boolean>(false);
  const [selectVisible, setSelectVisible] = useState<boolean>(false);
  const [redirect1, setRedirect1] = useState<boolean>(false);
  const [redirect2, setRedirect2] = useState<boolean>(false);
  const [changeStatus, setChangeStatus] = useState<string>();

  const dbRef = ref(getDatabase());
  const db = getDatabase();
  const router = useRouter();
  const roomId = router.query.roomId;

  onValue(ref(db, `Room/${roomId}/MemberStatus/Member1`), (snapshot) => {
    const data = snapshot.val();
    if (data != member1Status) {
      setMember1Status(data);
      console.log(data);
    }
  });

  onValue(ref(db, `Room/${roomId}/MemberStatus/Member2`), (snapshot) => {
    const data = snapshot.val();
    if (data != member2Status) {
      setMember2Status(data);
      console.log(data);
    }
  });

  useEffect(() => {
    if (member2Status == "ready") {
      setRedirect2(false);
    }

    if (member1Status == "ready" && member2Status == "ready") {
      if (whoIs == "Member1") {
        setStartVisible(true);
      }
    }

    if (
      (member1Status == "selected" && member2Status == "selected") ||
      member1Status == "processing" ||
      member2Status == "processing"
    ) {
      setChangeStatus("processing");
    }

    console.log("changed");
  }, [member1Status, member2Status]);

  useEffect(() => {
    if (changeStatus != null) {
      if (whoIs == "Member1") {
        setStatus1();
      }
      if (whoIs == "Member2") {
        setStatus2();
      }
      console.log("changedone");
    }
  }, [changeStatus]);

  async function setStatus1() {
    const auth = getAuth();
    const db = getDatabase();
    update(ref(db, `Room/${roomId}/MemberStatus`), {
      Member1: changeStatus,
    });
  }

  async function setStatus2() {
    const auth = getAuth();
    const db = getDatabase();
    if (changeStatus != "ready")
      update(ref(db, `Room/${roomId}/MemberStatus`), {
        Member2: changeStatus,
      });
  }

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

  function w00_cal() {
    console.log("w00");
    HP2 -= damage1;
  }
  function w01_cal() {
    console.log("w01");
    HP2 -= damage1 / 2;
    HP1 += damage1 / 4;
  }
  function w02_cal() {
    console.log("w02");
    HP2 -= damage1 * 2;
    HP1 -= damage2;
  }
  function w03_cal() {
    console.log("w03");
    HP2 -= damage1 * 5;
    HP1 = 0;
  }
  function w04_cal() {
    console.log("w04");
    HP2 -= damage1 / 4;
    attack1 /= 2;
  }
  function w05_cal() {
    console.log("w05");
  }
  function w06_cal() {
    console.log("w06");
  }
  function w07_cal() {
    console.log("w07");
  }
  function w10_cal() {
    console.log("w10");
    HP1 += damage1;
  }
  function w11_cal() {
    console.log("w11");
    HP1 += HP1max / 2;
  }
  function w12_cal() {
    console.log("w12");
    HP1 = HP1max;
    defence1 /= 2;
    attack1 /= 2;
  }
  function w13_cal() {
    console.log("w13");
  }
  function w20_cal() {
    console.log("w20");
    attack2 *= 2;
    defence2 /= 2;
  }
  function w21_cal() {
    console.log("w21");
    defence1 *= 2;
  }
  function w22_cal() {
    console.log("w22");
    damage2 /= 3;
    defence2 /= 3;
  }
  function w23_cal() {
    console.log("w23");
    damage2 /= 2;
  }
  function w30_cal() {
    console.log("w30");
    zan = HP1;
    zanmax = HP1max;
    HP1 = HP2;
    HP1max = HP2max;
    HP2 = zan;
    HP2max = zanmax;
  }
  function w31_cal() {
    console.log("w31");
    attack1 *= 10;
    defence1 /= 10;
  }
  function w32_cal() {
    console.log("w32");
    HP1 = 1;
    HP2 = 1;
  }
  function w33_cal() {
    console.log("w33");
  }

  useEffect(() => {
    async function whoAmI() {
      const UUid = await getUid();
      const db = getDatabase();
      get(child(dbRef, `Room/${roomId}/Member`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            UUid == snapshot.val().Member1 ? setWhoIs("Member1") : null;
            UUid == snapshot.val().Member2 ? setWhoIs("Member2") : null;
            setRedirectWho(false);
          } else {
            console.log("No data available");
            setRedirectWho(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    whoAmI();
  }, [redirectWho]);

  useEffect(() => {
    const auth = getAuth();
    console.log(roomId);
    const snapshot = get(
      child(dbRef, `Room/${roomId}/ButtleStatus/Member1/Status`)
    )
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

  function start() {
    const db = getDatabase();
    update(ref(db, `Room/${roomId}/MemberStatus`), {
      Member1: "selecting",
      Member2: "selecting",
    });
    setStartVisible(false);
  }

  function panch() {
    if (whoIs == "Member1") {
      if (member1Status == "selecting") {
        setChangeStatus("selected");
      }
    }
    if (whoIs == "Member2") {
      if (member2Status == "selecting") {
        setChangeStatus("selected");
      }
    }
    setSelectVisible(false);
  }

  useEffect(() => {
    const auth = getAuth();
    console.log(roomId);
    const snapshot = get(
      child(dbRef, `Room/${roomId}/ButtleStatus/Member2/Status`)
    )
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

  async function leftRoom() {
    const UUid = await getUid();
    const db = getDatabase();
    get(child(dbRef, `Room/${roomId}/Member`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const Player2 = data.Member2;
          console.log(data.Member1);
          if (data.Member1 == UUid) {
            if (data.Member2 != null) {
              update(ref(db, `Room/${roomId}/Member`), {
                Member1: Player2,
                Member2: null,
              });
              update(ref(db, `Room/${roomId}/ButtleStatus`), {
                Member1: { Status: player2Status },
                Member2: null,
              });
              update(ref(db, `Room/${roomId}/MemberStatus`), {
                Member1: member2Status,
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
            update(ref(db, `Room/${roomId}/ButtleStatus`), {
              Member2: null,
            });
            update(ref(db, `Room/${roomId}/MemberStatus`), {
              Member2: null,
            });
            console.log("Room left");
            router.push("/home");
          }
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

  async function settest() {
    setChangeStatus("ready");
  }
  return null;

  return (
    <main>
      <h1>Room {roomId}</h1>
      <div className="p-10 text-blue-600 float-left">
        <div>{whoIs}</div>
        <h2 className="text-4xl p-10"></h2>
        <div>{member1Status}</div>
        <h2>HP {player1HP}</h2>
        <h2>Attack {player1Attack}</h2>
        <h2>Defence {player1Defence}</h2>
        <h2>Speed {player1Speed}</h2>
      </div>
      <div className="p-10 text-red-500 float-right">
        <h2 className="text-4xl p-10"></h2>
        <div>{member2Status}</div>
        HP {HP1} / {HP1max}
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
      <button
        onClick={panch}
        style={{ visibility: selectVisible ? "visible" : "hidden" }}
      >
        Panch
      </button>
      <button
        onClick={start}
        style={{ visibility: startVisible ? "visible" : "hidden" }}
      >
        Start
      </button>
      <h2>ける</h2>
      <h2>にげる</h2>
      <button onClick={settest}>test</button>
      <button onClick={leftRoom}>退室</button>
      <Button onClick={w00_cal}>たたく</Button>
      <Button onClick={w01_cal}>ちゅーちゅーする</Button>
      <Button onClick={w02_cal}>ぜんりょくこうげき</Button>
      <Button onClick={w03_cal}>じばく</Button>
      <Button onClick={w04_cal}>ぺちぺちする</Button>
      <Button onClick={w05_cal}>w05</Button>
      <Button onClick={w06_cal}>w06</Button>
      <Button onClick={w07_cal}>w07</Button>
      <Button onClick={w10_cal}>ねる</Button>
      <Button onClick={w11_cal}>ぐっすりねる</Button>
      <Button onClick={w12_cal}>ぜっき</Button>
      <Button onClick={w13_cal}>w13</Button>
      <Button onClick={w20_cal}>ちょうはつ</Button>
      <Button onClick={w21_cal}>ひきこもる</Button>
      <Button onClick={w22_cal}>こわいおにいさんをつれてくる</Button>
      <Button onClick={w23_cal}>にらむ</Button>
      <Button onClick={w30_cal}>ざんねんでしたー</Button>
      <Button onClick={w31_cal}>ぎあちぇんじ</Button>
      <Button onClick={w32_cal}>みちづれ</Button>
      <Button onClick={w33_cal}>w33</Button>
    </main>
  );
}

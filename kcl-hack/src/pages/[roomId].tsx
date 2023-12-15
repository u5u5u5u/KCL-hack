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
  const [player1HPmax, setPlayer1HPmax] = useState<number>(1);
  const [player1Attack, setPlayer1Attack] = useState<number>(0);
  const [player1Defence, setPlayer1Defence] = useState<number>(0);
  const [player1Speed, setPlayer1Speed] = useState<number>(0);
  const [player1deltaHP, setPlayer1deltaHP] = useState<number>(0);
  const [player1deltaAttack, setPlayer1deltaAttack] = useState<number>(0);
  const [player1deltaDefence, setPlayer1deltaDefence] = useState<number>(0);
  const [player1deltaSpeed, setPlayer1deltaSpeed] = useState<number>(0);
  const [damage1, setDamage1] = useState<number>(0);
  const [player1w00, setPlayer1w00] = useState<string>("");
  const [player1w01, setPlayer1w01] = useState<string>("");
  const [player1w02, setPlayer1w02] = useState<string>("");
  const [player1w03, setPlayer1w03] = useState<string>("");
  const [player1Img, setPlayer1Img] = useState<string>("");
  const [member2Status, setMember2Status] = useState<string>("null");
  const [player2Status, setPlayer2Status] = useState<Object>();
  const [player2HP, setPlayer2HP] = useState<number>(1);
  const [player2HPmax, setPlayer2HPmax] = useState<number>(1);
  const [player2Attack, setPlayer2Attack] = useState<number>(0);
  const [player2Defence, setPlayer2Defence] = useState<number>(0);
  const [player2Speed, setPlayer2Speed] = useState<number>(0);
  const [player2deltaHP, setPlayer2deltaHP] = useState<number>(0);
  const [player2deltaAttack, setPlayer2deltaAttack] = useState<number>(0);
  const [player2deltaDefence, setPlayer2deltaDefence] = useState<number>(0);
  const [player2deltaSpeed, setPlayer2deltaSpeed] = useState<number>(0);
  const [damage2, setDamage2] = useState<number>(0);
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

    if (member1Status == "processing" && member2Status == "processing") {
      if (player1Speed < player2Speed) {
        setChangeStatus("Member2Turn");
      } else {
        setChangeStatus("Member1Turn");
      }
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
  var strength1 = 500;
  var strength2 = 300;
  var HP1max = HP1;
  var HP2max = HP2;
  var zan;
  var zanmax;
  var w0 = 0;
  var w1 = 0;
  var w2 = 0;
  var w3 = 0;

  function w0_cal() {
    if (w0 == 0) {
      console.log("たたく");
      w00_cal();
    } else if (w0 == 1) {
      console.log("ちゅーちゅーする");
      w01_cal;
    } else if (w0 == 2) {
      console.log("ぜんりょくこうげき");
      w02_cal;
    } else if (w0 == 3) {
      console.log("じばく");
      w03_cal;
    } else if (w0 == 4) {
      console.log("ぺちぺちする");
      w04_cal;
    } else {
      console.log("エラーです");
    }
  }
  function w1_cal() {
    if (w1 == 0) {
      console.log("ねる");
      w10_cal();
    } else if (w1 == 1) {
      console.log("ぐっすりねる");
      w11_cal;
    } else if (w1 == 2) {
      console.log("ぜっき");
      w12_cal;
    } else {
      console.log("エラーです");
    }
  }
  function w2_cal() {
    if (w2 == 0) {
      console.log("ちょうはつ");
      w20_cal();
    } else if (w2 == 1) {
      console.log("ひきこもる");
      w21_cal;
    } else if (w2 == 2) {
      console.log("こわいおにいさんをつれてくる");
      w22_cal;
    } else if (w2 == 3) {
      console.log("にらむ");
      w23_cal;
    } else {
      console.log("エラーです");
    }
  }
  function w3_cal() {
    if (w3 == 0) {
      console.log("ざんねんでしたー");
      w30_cal();
    } else if (w3 == 1) {
      console.log("ぎあちぇんじ");
      w31_cal;
    } else if (w3 == 2) {
      console.log("みちづれ");
      w32_cal;
    } else {
      console.log("エラーです");
    }
  }

  function calDamege() {
    setDamage1((player1Attack / player2Defence) * 100);
    setDamage2((player2Attack / player1Defence) * 100);
  }

  function w00_cal() {//相手に1倍ダメージを与える
    if (whoIs == "Member1") {
      console.log("w00");
      setPlayer2deltaHP(-damage1);
    }
    if (whoIs == "Member2") {
      console.log("w00");
      setPlayer1deltaHP(-damage2);
    }
  }
  function w01_cal() { //相手に0.5倍ダメージを与え、与えたダメージの0.5倍自分を回復する
    if (whoIs == "Member1") {
      console.log("w01");
      setPlayer2deltaHP(-damage1 / 2);
      setPlayer1deltaHP(damage1 / 4);
    }
    if (whoIs == "Member2") {
      console.log("w01");
      setPlayer1deltaHP(-damage2 / 2);
      setPlayer2deltaHP(damage2 / 4);
    }
  }
  function w02_cal() { //相手に2倍ダメージを与え、相手が自分に1倍ダメージを与える
    if (whoIs == "Member1") {
      console.log("w02");
      setPlayer2deltaHP(-damage1 * 2);
      setPlayer1deltaHP(-damage2);
    }
    if (whoIs == "Member2") {
      console.log("w02");
      setPlayer1deltaHP(-damage2 * 2);
      setPlayer2deltaHP(-damage1);
    }
  }
  function w03_cal() {　//相手に5倍ダメージを与え、自分のHPを0にする
    if (whoIs == "Member1") {
      console.log("w03");
      setPlayer2deltaHP(-damage1 * 5);
      setPlayer1HP(0);
    }
    if (whoIs == "Member2") {
      console.log("w03");
      setPlayer1deltaHP(-damage2 * 5);
      setPlayer2HP(0);
    }
  }
  function w04_cal() { //相手に0.25倍ダメージを与え、自分のこうげきを2倍にする
    if (whoIs == "Member1") {
      console.log("w04");
      setPlayer2deltaHP(-damage1 / 4);
      setPlayer1Attack(player1Attack / 2);
    }
    if (whoIs == "Member2") {
      console.log("w04");
      setPlayer1deltaHP(-damage2 / 4);
      setPlayer2Attack(player2Attack / 2);
    }
  }

  function w10_cal() { //自分の1倍ダメージぶん自分を回復する
    if (whoIs == "Member1") {
      console.log("w10");
      setPlayer2deltaHP(damage1);
    }
    if (whoIs == "Member2") {
      console.log("w10");
      setPlayer1deltaHP(damage2);
    }
  }
  function w11_cal() {//自分のHP上限の0.5倍自分を回復する
    if (whoIs == "Member1") {
      console.log("w11");
      setPlayer1deltaHP(player1HPmax / 2);
    }
    if (whoIs == "Member2") {
      console.log("w11");
      setPlayer2deltaHP(player2HPmax / 2);
    }
  }
  function w12_cal() {//自分のHPを全回復し、自分のこうげきとぼうぎょをそれぞれ0.5倍する
    if (whoIs == "Member1") {
      console.log("w12");
      HP1 = HP1max;
      setPlayer1Defence(player1Defence / 2);
      setPlayer1Attack(player1Attack / 2);
    }
    if (whoIs == "Member2") {
      console.log("w12");
      HP2 = HP2max;
      setPlayer2Defence(player2Defence / 2);
      setPlayer2Attack(player2Attack / 2);
    }
  }

  function w20_cal() {//相手のこうげきを2倍、ぼうぎょを0.5倍する
    if (whoIs == "Member1") {
      console.log("w20");
      setPlayer1Attack(player1Attack * 2);
      setPlayer2Defence(player2Defence / 2);
    }
    if (whoIs == "Member2") {
      console.log("w20");
      setPlayer2Attack(player2Attack * 2);
      setPlayer1Defence(player1Defence / 2);
    }
  }
  function w21_cal() {//自分のぼうぎょを2倍する
    if (whoIs == "Member1") {
      console.log("w21");
      setPlayer1Defence(player1Defence * 2);
    }
    if (whoIs == "Member2") {
      console.log("w21");
      setPlayer2Defence(player2Defence * 2);
    }
  }
  function w22_cal() {//相手のこうげきとぼうぎょをそれぞれ0.33倍する
    if (whoIs == "Member1") {
      console.log("w22");
      setPlayer2Attack(player2Attack / 3);
      setPlayer1Attack(player1Attack / 3);
    }
    if (whoIs == "Member2") {
      console.log("w22");
      setPlayer1Attack(player1Attack / 3);
      setPlayer2Attack(player2Attack / 3);
    }
  }
  function w23_cal() { //相手のこうげきを0.5倍する
    if (whoIs == "Member1") {
      console.log("w23");
      setPlayer2Attack(player2Attack / 2);
    }
    if (whoIs == "Member2") {
      console.log("w23");
      setPlayer1Attack(player1Attack / 2);
    }
  }
  function w30_cal() {//自分のHP上限、HPをそれぞれ相手と入れ替える
    console.log("w30");
    const temp = HP1;
    const tempMax = HP1max;
    setPlayer1HP(player2HP);
    setPlayer1HPmax(player2HPmax);
    setPlayer2HP(temp);
    setPlayer2HPmax(tempMax);
  }
  function w31_cal() {//自分のこうげきを10倍、ぼうぎょを0.1倍する
    if (whoIs == "Member1") {
      console.log("w31");
      setPlayer1Attack(player1Attack * 10);
      setPlayer1Defence(player1Defence / 10);
    }
    if (whoIs == "Member2") {
      console.log("w31");
      setPlayer2Attack(player2Attack * 10);
      setPlayer2Defence(player2Defence / 10);
    }
  }
  function w32_cal() {//自分と相手のHPをそれぞれ100にする
    console.log("w32");
    setPlayer1HP(100);
    setPlayer2HP(100);
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
          setPlayer1HPmax(data.HPmax);
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
          setPlayer2HPmax(data.HPmax);
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

  useEffect(() => {
    if (w0 == 0) {
      setPlayer1w00("たたく");
    } else if (w0 == 1) {
      setPlayer1w00("ちゅーちゅーする");
    } else if (w0 == 2) {
      setPlayer1w00("ぜんりょくこうげき");
    } else if (w0 == 3) {
      setPlayer1w00("じばく");
    } else if (w0 == 4) {
      setPlayer1w00("ぺちぺちする");
    } else {
      setPlayer1w00("エラーです");
    }
    if (w1 == 0) {
      setPlayer1w01("ねる");
    } else if (w1 == 1) {
      setPlayer1w01("ぐっすりねる");
    } else if (w1 == 2) {
      setPlayer1w01("ぜっき");
    } else {
      setPlayer1w01("エラーです");
    }
    if (w2 == 0) {
      setPlayer1w02("ちょうはつ");
    } else if (w2 == 1) {
      setPlayer1w02("ひきこもる");
    } else if (w2 == 2) {
      setPlayer1w02("こわいおにいさんをつれてくる");
    } else if (w2 == 3) {
      setPlayer1w02("にらむ");
    } else {
      setPlayer1w02("エラーです");
    }
    if (w3 == 0) {
      setPlayer1w03("ざんねんでしたー");
    } else if (w3 == 1) {
      setPlayer1w03("ぎあちぇんじ");
    } else if (w3 == 2) {
      setPlayer1w03("みちづれ");
    } else {
      setPlayer1w03("エラーです");
    }
  });

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
        HP {player1HP} / {player1HPmax}
        <h2>こうげき {player1Attack}</h2>
        <h2>ぼうぎょ {player1Defence}</h2>
        <h2>すばやさ {player1Speed}</h2>
      </div>
      <div className="p-10 text-red-500 float-right">
        <h2 className="text-4xl p-10">{name2}</h2>
        <h2>
          HP {player2HP} / {player2HPmax}
        </h2>
        <h2>こうげき {player2Attack}</h2>
        <h2>ぼうぎょ {player2Defence}</h2>
        <h2>すばやさ {player2Speed}</h2>
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
      <Button onClick={w0_cal}>{player1w00}</Button>
      <Button onClick={w1_cal}>{player1w01}</Button>
      <Button onClick={w2_cal}>{player1w02}</Button>
      <Button onClick={w3_cal}>{player1w03}</Button>
    </main>
  );
}

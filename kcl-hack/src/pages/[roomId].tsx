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
  const [w00, setw00] = useState<number>(0);
  const [w01, setw01] = useState<number>(0);
  const [w02, setw02] = useState<number>(0);
  const [w03, setw03] = useState<number>(0);
  const [playerw00, setPlayerw00] = useState<string>("");
  const [playerw01, setPlayerw01] = useState<string>("");
  const [playerw02, setPlayerw02] = useState<string>("");
  const [playerw03, setPlayerw03] = useState<string>("");
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

    if (member1Status == "selecting" || member2Status == "selecting") {
      setSelectVisible(true);
      getplayerw();
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

  async function getplayerw() {
    const auth = getAuth();
    const db = getDatabase();
    if (whoIs == "Member1") {
      const snapshot = get(
        child(dbRef, `Room/${roomId}/ButtleStatus/Member1/Status`)
      )
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("available");
            const data = snapshot.val();
            setw00(data.w00);
            setw01(data.w01);
            setw02(data.w02);
            setw03(data.w03);
            lookw();
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    if (whoIs == "Member2") {
      const snapshot = get(
        child(dbRef, `Room/${roomId}/ButtleStatus/Member2/Status`)
      )
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log("available");
            const data = snapshot.val();
            setw00(data.w00);
            setw01(data.w01);
            setw02(data.w02);
            setw03(data.w03);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function w0_cal() {
    if (w00 == 0) {
      console.log("たたく");
      w00_cal();
    } else if (w00 == 1) {
      console.log("ちゅーちゅーする");
      w01_cal;
    } else if (w00 == 2) {
      console.log("ぜんりょくこうげき");
      w02_cal;
    } else if (w00 == 3) {
      console.log("じばく");
      w03_cal;
    } else if (w00 == 4) {
      console.log("ぺちぺちする");
      w04_cal;
    } else {
      console.log("エラーです");
    }
  }
  function w1_cal() {
    if (w01 == 0) {
      console.log("ねる");
      w10_cal();
    } else if (w01 == 1) {
      console.log("ぐっすりねる");
      w11_cal;
    } else if (w01 == 2) {
      console.log("ぜっき");
      w12_cal;
    } else {
      console.log("エラーです");
    }
  }
  function w2_cal() {
    if (w02 == 0) {
      console.log("ちょうはつ");
      w20_cal();
    } else if (w02 == 1) {
      console.log("ひきこもる");
      w21_cal;
    } else if (w02 == 2) {
      console.log("こわいおにいさんをつれてくる");
      w22_cal;
    } else if (w02 == 3) {
      console.log("にらむ");
      w23_cal;
    } else {
      console.log("エラーです");
    }
  }
  function w3_cal() {
    if (w03 == 0) {
      console.log("ざんねんでしたー");
      w30_cal();
    } else if (w03 == 1) {
      console.log("ぎあちぇんじ");
      w31_cal;
    } else if (w03 == 2) {
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

  function w00_cal() {
    //相手に1倍ダメージを与える
    if (whoIs == "Member1") {
      console.log("w00");
      setPlayer2deltaHP(-damage1);
    }
    if (whoIs == "Member2") {
      console.log("w00");
      setPlayer1deltaHP(-damage2);
    }
  }
  function w01_cal() {
    //相手に0.5倍ダメージを与え、与えたダメージの0.5倍自分を回復する
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
  function w02_cal() {
    //相手に2倍ダメージを与え、相手が自分に1倍ダメージを与える
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
  function w03_cal() {
    //相手に5倍ダメージを与え、自分のHPを0にする
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
  function w04_cal() {
    //相手に0.25倍ダメージを与え、自分のこうげきを2倍にする
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

  function w10_cal() {
    //自分の1倍ダメージぶん自分を回復する
    if (whoIs == "Member1") {
      console.log("w10");
      setPlayer2deltaHP(damage1);
    }
    if (whoIs == "Member2") {
      console.log("w10");
      setPlayer1deltaHP(damage2);
    }
  }
  function w11_cal() {
    //自分のHP上限の0.5倍自分を回復する
    if (whoIs == "Member1") {
      console.log("w11");
      setPlayer1deltaHP(player1HPmax / 2);
    }
    if (whoIs == "Member2") {
      console.log("w11");
      setPlayer2deltaHP(player2HPmax / 2);
    }
  }
  function w12_cal() {
    //自分のHPを全回復し、自分のこうげきとぼうぎょをそれぞれ0.5倍する
    if (whoIs == "Member1") {
      console.log("w12");
      setPlayer1HP(player1HPmax);
      setPlayer1Defence(player1Defence / 2);
      setPlayer1Attack(player1Attack / 2);
    }
    if (whoIs == "Member2") {
      console.log("w12");
      setPlayer2HP(player2HPmax);
      setPlayer2Defence(player2Defence / 2);
      setPlayer2Attack(player2Attack / 2);
    }
  }

  function w20_cal() {
    //相手のこうげきを2倍、ぼうぎょを0.5倍する
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
  function w21_cal() {
    //自分のぼうぎょを2倍する
    if (whoIs == "Member1") {
      console.log("w21");
      setPlayer1Defence(player1Defence * 2);
    }
    if (whoIs == "Member2") {
      console.log("w21");
      setPlayer2Defence(player2Defence * 2);
    }
  }
  function w22_cal() {
    //相手のこうげきとぼうぎょをそれぞれ0.33倍する
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
  function w23_cal() {
    //相手のこうげきを0.5倍する
    if (whoIs == "Member1") {
      console.log("w23");
      setPlayer2Attack(player2Attack / 2);
    }
    if (whoIs == "Member2") {
      console.log("w23");
      setPlayer1Attack(player1Attack / 2);
    }
  }
  function w30_cal() {
    //自分のHP上限、HPをそれぞれ相手と入れ替える
    console.log("w30");
    const temp = player1HP;
    const tempMax = player1HPmax;
    setPlayer1HP(player2HP);
    setPlayer1HPmax(player2HPmax);
    setPlayer2HP(temp);
    setPlayer2HPmax(tempMax);
  }
  function w31_cal() {
    //自分のこうげきを10倍、ぼうぎょを0.1倍する
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
  function w32_cal() {
    //自分と相手のHPをそれぞれ100にする
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

  function lookw() {
    if (w00 == 0) {
      setPlayerw00("たたく");
    } else if (w00 == 1) {
      setPlayerw00("ちゅーちゅーする");
    } else if (w00 == 2) {
      setPlayerw00("ぜんりょくこうげき");
    } else if (w00 == 3) {
      setPlayerw00("じばく");
    } else if (w00 == 4) {
      setPlayerw00("ぺちぺちする");
    } else {
      setPlayerw00("エラーです");
    }
    if (w01 == 0) {
      setPlayerw01("ねる");
    } else if (w01 == 1) {
      setPlayerw01("ぐっすりねる");
    } else if (w01 == 2) {
      setPlayerw01("ぜっき");
    } else {
      setPlayerw01("エラーです");
    }
    if (w02 == 0) {
      setPlayerw02("ちょうはつ");
    } else if (w02 == 1) {
      setPlayerw02("ひきこもる");
    } else if (w02 == 2) {
      setPlayerw02("こわいおにいさんをつれてくる");
    } else if (w02 == 3) {
      setPlayerw02("にらむ");
    } else {
      setPlayerw02("エラーです");
    }
    if (w03 == 0) {
      setPlayerw03("ざんねんでしたー");
    } else if (w03 == 1) {
      setPlayerw03("ぎあちぇんじ");
    } else if (w03 == 2) {
      setPlayerw03("みちづれ");
    } else {
      setPlayerw03("エラーです");
    }
  }

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
        <h2 className="text-4xl p-10"></h2>
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
        onClick={start}
        style={{ visibility: startVisible ? "visible" : "hidden" }}
      >
        Start
      </button>
      <h2>ける</h2>
      <h2>にげる</h2>
      <button onClick={settest}>test</button>
      <button onClick={leftRoom}>退室</button>
      <Button
        onClick={w0_cal}
        style={{ visibility: selectVisible ? "visible" : "hidden" }}
      >
        {playerw00}
      </Button>
      <Button
        onClick={w1_cal}
        style={{ visibility: selectVisible ? "visible" : "hidden" }}
      >
        {playerw01}
      </Button>
      <Button
        onClick={w2_cal}
        style={{ visibility: selectVisible ? "visible" : "hidden" }}
      >
        {playerw02}
      </Button>
      <Button
        onClick={w3_cal}
        style={{ visibility: selectVisible ? "visible" : "hidden" }}
      >
        {playerw03}
      </Button>
    </main>
  );
}

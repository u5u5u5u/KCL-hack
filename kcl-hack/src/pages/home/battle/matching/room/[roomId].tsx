"use client";
import { useRouter } from "next/router";
import React, { use, useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push,
  update,
  remove,
  onValue,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import styles from "../../../../../styles/[roomId].module.css";

export default function Home() {
  const [ButtleLog, setButtleLog] = useState<string[]>([]);
  const [whoIs, setWhoIs] = useState<string>("spectators");
  const [redirectWho, setRedirectWho] = useState<boolean>(false);
  const [Member1Name, setMember1Name] = useState<string>("");
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
  const [Member2Name, setMember2Name] = useState<string>("");
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
  const [processingBlocker, setProcessingBlocker] = useState<boolean>(false);
  const [redirect1, setRedirect1] = useState<boolean>(false);
  const [redirect2, setRedirect2] = useState<boolean>(false);
  const [redirect3, setRedirect3] = useState<boolean>(false);
  const [w00, setw00] = useState<number>(0);
  const [w01, setw01] = useState<number>(0);
  const [w02, setw02] = useState<number>(0);
  const [w03, setw03] = useState<number>(0);
  const [playerw00, setPlayerw00] = useState<string>("");
  const [playerw01, setPlayerw01] = useState<string>("");
  const [playerw02, setPlayerw02] = useState<string>("");
  const [playerw03, setPlayerw03] = useState<string>("");
  const [selectw, setSelectw] = useState<number>(-1);
  const [selectt, setSelectt] = useState<number>(-1);
  const [turnStarted, setTurnStarted] = useState<boolean>(false);
  const [statusFetchDone, setStatusFetchDone] = useState<boolean>(false);
  const [damageSetUped, setDamageSetUped] = useState<boolean>(false);
  const [calDone, setCalDone] = useState<boolean>(false);
  const [mathTrancDone, setMathTrancDone] = useState<boolean>(false);
  const [deltaChanged, setDeltaChanged] = useState<boolean>(false);
  const [youWin, setYouWin] = useState<boolean>(false);
  const [youLose, setYouLose] = useState<boolean>(false);

  const dbRef = ref(getDatabase());
  const db = getDatabase();
  const router = useRouter();
  const roomId = router.query.roomId;

  onValue(ref(db, `Room/${roomId}/MemberStatus/Member1`), (snapshot) => {
    const data = snapshot.val();
    if (data != member1Status) {
      setMember1Status(data);
      console.log("changed1 to " + data);
    }
  });

  onValue(ref(db, `Room/${roomId}/MemberStatus/Member2`), (snapshot) => {
    const data = snapshot.val();
    if (data != member2Status) {
      setMember2Status(data);
      console.log("changed2 to " + data);
    }
  });

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    if (whoIs != "spectators") {
      if (member2Status == "ready") {
        setRedirect2(false);
      }

      if (member1Status == "ready" && member2Status == "ready") {
        if (whoIs == "Member1") {
          setStartVisible(true);
        }
      }

      if (member1Status == "selecting" && member2Status == "selecting") {
        console.log("success");
        fetchButtleStatus1();
        console.log("fetch");
        setSelectVisible(true);
        fetchButtlelog();
        getplayerw();
      }

      if (member1Status == "selected" && member2Status == "selected") {
        setSelectVisible(false);
        if (!processingBlocker) {
          setProcessingBlocker(true);
          update(ref(db, `Room/${roomId}/MemberStatus`), {
            Member1: "processing",
            Member2: "processing",
          });
        }
      }

      if (member1Status == "processing" && member2Status == "processing") {
        if (player1Speed < player2Speed) {
          update(ref(db, `Room/${roomId}/MemberStatus`), {
            Member1: "foMember2Turn",
            Member2: "foMember2Turn",
          });
        } else {
          update(ref(db, `Room/${roomId}/MemberStatus`), {
            Member1: "foMember1Turn",
            Member2: "foMember1Turn",
          });
        }
      }

      if (
        member1Status == "foMember1Turn" &&
        member2Status == "foMember1Turn"
      ) {
        if (whoIs == "Member1") {
          setTurnStarted(true);
          console.log("fetch");
        }
      }

      if (
        member1Status == "foMember2Turn" &&
        member2Status == "foMember2Turn"
      ) {
        if (whoIs == "Member2") {
          setTurnStarted(true);
          console.log("fetch");
        }
      }

      if (
        member1Status == "laMember1Turn" &&
        member2Status == "laMember1Turn"
      ) {
        if (whoIs == "Member1") {
          setTurnStarted(true);
          console.log("fetch");
        }
      }
      if (
        member1Status == "laMember2Turn" &&
        member2Status == "laMember2Turn"
      ) {
        if (whoIs == "Member2") {
          setTurnStarted(true);
          console.log("fetch");
        }
      }

      if (member1Status == "win" && member2Status == "lose") {
        fetchButtleStatus1();
        fetchButtleStatus2();
        if (whoIs == "Member1") {
          setYouWin(true);
          fetchButtlelog();
          setSelectVisible(false);
        }
        if (whoIs == "Member2") {
          setYouLose(true);
          fetchButtlelog();
          setSelectVisible(false);
        }
      }
      if (member1Status == "lose" && member2Status == "win") {
        fetchButtleStatus1();
        fetchButtleStatus2();
        if (whoIs == "Member1") {
          setYouLose(true);
          setSelectVisible(false);
        }
        if (whoIs == "Member2") {
          setYouWin(true);
          setSelectVisible(false);
        }
      }
      console.log("check");
    }
  }, [member1Status, member2Status]);

  function damegeCal() {
    setDamage1((player1Attack / player2Defence) * 100);
    setDamage2((player2Attack / player1Defence) * 100);
    setDamageSetUped(true);
    console.log("done");
  }

  useEffect(() => {
    if (turnStarted) {
      fetchButtleStatus1();
    }
  }, [turnStarted]);

  useEffect(() => {
    if (statusFetchDone) {
      damegeCal();
    }
  }, [statusFetchDone]);

  useEffect(() => {
    getplayerw();
  }, [redirect3]);

  useEffect(() => {
    calDeltaStatus();
  }, [damageSetUped]);

  useEffect(() => {
    if (calDone) {
      setPlayer1deltaAttack(Math.trunc(player1deltaAttack));
      setPlayer1deltaDefence(Math.trunc(player1deltaDefence));
      setPlayer1deltaHP(Math.trunc(player1deltaHP));
      setPlayer1deltaSpeed(Math.trunc(player1deltaSpeed));
      setPlayer2deltaAttack(Math.trunc(player2deltaAttack));
      setPlayer2deltaDefence(Math.trunc(player2deltaDefence));
      setPlayer2deltaHP(Math.trunc(player2deltaHP));
      setPlayer2deltaSpeed(Math.trunc(player2deltaSpeed));
      setMathTrancDone(true);
    }
  }, [calDone]);

  useEffect(() => {
    if (mathTrancDone) {
      setPlayer1HP(player1HP + player1deltaHP);
      setPlayer1deltaHP(0);
      if (player1deltaHP > 0) {
        if (whoIs == "Member1") {
          pushButtlelog(Member1Name + "のHPが" + player1deltaHP + "回復した");
        }
        if (whoIs == "Member2") {
          pushButtlelog(Member1Name + "のHPが" + player1deltaHP + "回復した");
        }
      }
      if (player1deltaHP < 0) {
        pushButtlelog(Member1Name + "に" + -player1deltaHP + "のダメージ！");
      }
      setPlayer1Attack(player1Attack + player1deltaAttack);
      if (player1deltaAttack > 0) {
        pushButtlelog(
          Member1Name + "のこうげきが" + player1deltaAttack + "上がった"
        );
      }
      if (player1deltaAttack < 0) {
        pushButtlelog(
          Member1Name + "のこうげきが" + -player1deltaAttack + "下がった"
        );
      }
      setPlayer1deltaAttack(0);
      setPlayer1Defence(player1Defence + player1deltaDefence);
      if (player1deltaDefence > 0) {
        pushButtlelog(
          Member1Name + "のぼうぎょが" + player1deltaDefence + "上がった"
        );
      }
      if (player1deltaDefence < 0) {
        pushButtlelog(
          Member1Name + "のぼうぎょが" + -player1deltaDefence + "下がった"
        );
      }
      setPlayer1deltaDefence(0);
      setPlayer1Speed(player1Speed + player1deltaSpeed);
      if (player1deltaSpeed > 0) {
        pushButtlelog(
          Member1Name + "のすばやさが" + player1deltaSpeed + "上がった"
        );
      }
      if (player1deltaSpeed < 0) {
        pushButtlelog(
          Member1Name + "のすばやさが" + -player1deltaSpeed + "下がった"
        );
      }
      setPlayer1deltaSpeed(0);
      setPlayer2HP(player2HP + player2deltaHP);
      if (player2deltaHP > 0) {
        pushButtlelog(Member2Name + "のHPが" + player2deltaHP + "回復した");
      }
      if (player2deltaHP < 0) {
        pushButtlelog(Member2Name + "に" + -player2deltaHP + "のダメージ！");
      }
      setPlayer2deltaHP(0);
      setPlayer2Attack(player2Attack + player2deltaAttack);
      if (player2deltaAttack > 0) {
        pushButtlelog(
          Member2Name + "のこうげきが" + player2deltaAttack + "上がった"
        );
      }
      if (player2deltaAttack < 0) {
        pushButtlelog(
          Member2Name + "のこうげきが" + -player2deltaAttack + "下がった"
        );
      }
      setPlayer2deltaAttack(0);
      setPlayer2Defence(player2Defence + player2deltaDefence);
      if (player2deltaDefence > 0) {
        pushButtlelog(
          Member2Name + "のぼうぎょが" + player2deltaDefence + "上がった"
        );
      }
      if (player2deltaDefence < 0) {
        pushButtlelog(
          Member2Name + "のぼうぎょが" + -player2deltaDefence + "下がった"
        );
      }
      setPlayer2deltaDefence(0);
      setPlayer2Speed(player2Speed + player2deltaSpeed);
      if (player2deltaSpeed > 0) {
        pushButtlelog(
          Member2Name + "のすばやさが" + player2deltaSpeed + "上がった"
        );
      }
      if (player2deltaSpeed < 0) {
        pushButtlelog(
          Member2Name + "のすばやさが" + -player2deltaSpeed + "下がった"
        );
      }
      setPlayer2deltaSpeed(0);
      setDeltaChanged(true);
    }
  }, [mathTrancDone]);

  useEffect(() => {
    if (deltaChanged) {
      update(ref(db, `Room/${roomId}/ButtleStatus/Member1/Status`), {
        HPmax: player1HPmax,
        HP: player1HP,
        Attack: player1Attack,
        Defence: player1Defence,
        Speed: player1Speed,
      });
      update(ref(db, `Room/${roomId}/ButtleStatus/Member2/Status`), {
        HPmax: player2HPmax,
        HP: player2HP,
        Attack: player2Attack,
        Defence: player2Defence,
        Speed: player2Speed,
      });
      if (player1HP > 0 && player2HP > 0) {
        if (
          member1Status == "foMember1Turn" &&
          member2Status == "foMember1Turn"
        ) {
          update(ref(db, `Room/${roomId}/MemberStatus`), {
            Member1: "laMember2Turn",
            Member2: "laMember2Turn",
          });
        }
        if (
          member1Status == "foMember2Turn" &&
          member2Status == "foMember2Turn"
        ) {
          update(ref(db, `Room/${roomId}/MemberStatus`), {
            Member1: "laMember1Turn",
            Member2: "laMember1Turn",
          });
        }
        if (
          member1Status == "laMember1Turn" &&
          member2Status == "laMember1Turn"
        ) {
          update(ref(db, `Room/${roomId}/MemberStatus`), {
            Member1: "selecting",
            Member2: "selecting",
          });
        }
        if (
          member1Status == "laMember2Turn" &&
          member2Status == "laMember2Turn"
        ) {
          update(ref(db, `Room/${roomId}/MemberStatus`), {
            Member1: "selecting",
            Member2: "selecting",
          });
        }
        setProcessingBlocker(false);
        setTurnStarted(false);
        setDamageSetUped(false);
        setCalDone(false);
        setStatusFetchDone(false);
        setMathTrancDone(false);
        setDeltaChanged(false);
      } else {
        if (player1HP <= 0) {
          update(ref(db, `Room/${roomId}/MemberStatus`), {
            Member1: "lose",
            Member2: "win",
          });
        }
        if (player2HP <= 0) {
          update(ref(db, `Room/${roomId}/MemberStatus`), {
            Member1: "win",
            Member2: "lose",
          });
        }
      }
    }
  }, [deltaChanged]);

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
            setRedirect3(false);
          } else {
            console.log("No data available");
            setRedirect3(true);
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
            setRedirect3(false);
          } else {
            console.log("No data available");
            setRedirect3(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function calDeltaStatus() {
    if (damageSetUped) {
      if (selectt == 0) {
        if (whoIs == "Member1") {
          pushButtlelog(Member1Name + "の" + playerw00 + "!");
        }
        if (whoIs == "Member2") {
          pushButtlelog(Member2Name + "の" + playerw00 + "!");
        }
        if (selectw == 0) {
          console.log("たたく");
          setDamageSetUped(false);
          w00_cal();
        } else if (selectw == 1) {
          console.log("ちゅーちゅーする");
          setDamageSetUped(false);
          w01_cal();
        } else if (selectw == 2) {
          console.log("ぜんりょくこうげき");
          setDamageSetUped(false);
          w02_cal();
        } else if (selectw == 3) {
          console.log("じばく");
          setDamageSetUped(false);
          w03_cal();
        } else if (selectw == 4) {
          console.log("ぺちぺちする");
          setDamageSetUped(false);
          w04_cal();
        } else {
          console.log("エラーです");
          setDamageSetUped(false);
        }
      }
      if (selectt == 1) {
        if (whoIs == "Member1") {
          pushButtlelog(Member1Name + "の" + playerw01 + "!");
        }
        if (whoIs == "Member2") {
          pushButtlelog(Member2Name + "の" + playerw01 + "!");
        }
        if (selectw == 0) {
          console.log("ねる");
          setDamageSetUped(false);
          w10_cal();
        } else if (selectw == 1) {
          console.log("ぐっすりねる");
          setDamageSetUped(false);
          w11_cal();
        } else if (selectw == 2) {
          console.log("ぜっき");
          setDamageSetUped(false);
          w12_cal();
        } else {
          console.log("エラーです");
          setDamageSetUped(false);
        }
      }
      if (selectt == 2) {
        if (whoIs == "Member1") {
          pushButtlelog(Member1Name + "の" + playerw02 + "!");
        }
        if (whoIs == "Member2") {
          pushButtlelog(Member2Name + "の" + playerw02 + "!");
        }
        if (selectw == 0) {
          console.log("ちょうはつ");
          setDamageSetUped(false);
          w20_cal();
        } else if (selectw == 1) {
          console.log("ひきこもる");
          setDamageSetUped(false);
          w21_cal();
        } else if (selectw == 2) {
          console.log("こわいおにいさんをつれてくる");
          setDamageSetUped(false);
          w22_cal();
        } else if (selectw == 3) {
          console.log("にらむ");
          setDamageSetUped(false);
          w23_cal();
        } else {
          console.log("エラーです");
          setDamageSetUped(false);
        }
      }
      if (selectt == 3) {
        if (whoIs == "Member1") {
          pushButtlelog(Member1Name + "の" + playerw03 + "!");
        }
        if (whoIs == "Member2") {
          pushButtlelog(Member2Name + "の" + playerw03 + "!");
        }
        if (selectw == 0) {
          console.log("ざんねんでしたー");
          setDamageSetUped(false);
          w30_cal();
        } else if (selectw == 1) {
          console.log("ぎあちぇんじ");
          setDamageSetUped(false);
          w31_cal();
        } else if (selectw == 2) {
          console.log("みちづれ");
          setDamageSetUped(false);
          w32_cal();
        } else {
          console.log("エラーです");
          setDamageSetUped(false);
        }
      }
    }
  }

  function w0_cal() {
    setSelectt(0);
    setSelectw(w00);
    selected();
    setSelectVisible(false);
  }
  function w1_cal() {
    setSelectt(1);
    setSelectw(w01);
    selected();
    setSelectVisible(false);
  }
  function w2_cal() {
    setSelectt(2);
    setSelectw(w02);
    selected();
    setSelectVisible(false);
  }
  function w3_cal() {
    setSelectt(3);
    setSelectw(w03);
    selected();
    setSelectVisible(false);
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
    setCalDone(true);
  }
  function w01_cal() {
    //相手に0.5倍ダメージを与え、与えたダメージの0.5倍自分を回復する
    if (whoIs == "Member1") {
      console.log("w01");
      setPlayer2deltaHP(-damage1 / 2);
      setPlayer1deltaHP(damage1 / 2);
    }
    if (whoIs == "Member2") {
      console.log("w01");
      setPlayer1deltaHP(-damage2 / 2);
      setPlayer2deltaHP(damage2 / 2);
    }
    setCalDone(true);
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
    setCalDone(true);
  }
  function w03_cal() {
    //相手に5倍ダメージを与え、自分のHPを0にする
    if (whoIs == "Member1") {
      console.log("w03");
      setPlayer2deltaHP(-damage1 * 5);
      setPlayer1deltaHP(-player1HP);
    }
    if (whoIs == "Member2") {
      console.log("w03");
      setPlayer1deltaHP(-damage2 * 5);
      setPlayer2deltaHP(-player2HP);
    }
    setCalDone(true);
  }
  function w04_cal() {
    //相手に0.25倍ダメージを与え、自分のこうげきを2倍にする
    if (whoIs == "Member1") {
      console.log("w04");
      setPlayer2deltaHP(-damage1 / 4);
      setPlayer1deltaAttack(player1Attack);
    }
    if (whoIs == "Member2") {
      console.log("w04");
      setPlayer1deltaHP(-damage2 / 4);
      setPlayer2deltaAttack(player2Attack);
    }
    setCalDone(true);
  }

  function w10_cal() {
    //自分の1倍attackぶん自分を回復する
    if (whoIs == "Member1") {
      console.log("w10");
      setPlayer1deltaHP(player1Attack);
    }
    if (whoIs == "Member2") {
      console.log("w10");
      setPlayer2deltaHP(player2Attack);
    }
    setCalDone(true);
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
    setCalDone(true);
  }
  function w12_cal() {
    //自分のHPを全回復し、自分のこうげきとぼうぎょをそれぞれ0.5倍する
    if (whoIs == "Member1") {
      console.log("w12");
      if (player1HPmax - player1HP > 0) {
        setPlayer1deltaHP(player1HPmax - player1HP);
      }
      setPlayer1deltaDefence(player1Defence / 2 - player1Defence);
      setPlayer1deltaAttack(player1Attack / 2 - player1Attack);
    }
    if (whoIs == "Member2") {
      console.log("w12");
      if (player2HPmax - player2HP > 0) {
        setPlayer2deltaHP(player2HPmax - player2HP);
      }
      setPlayer2deltaDefence(player2Defence / 2 - player2Defence);
      setPlayer2deltaAttack(player2Attack / 2 - player2Attack);
    }
    setCalDone(true);
  }

  function w20_cal() {
    //相手のこうげきを2倍、ぼうぎょを0.5倍する
    if (whoIs == "Member1") {
      console.log("w20");
      setPlayer2deltaAttack(player2Attack);
      setPlayer2deltaDefence(player2Defence / 2 - player2Defence);
    }
    if (whoIs == "Member2") {
      console.log("w20");
      setPlayer1deltaAttack(player1Attack);
      setPlayer1deltaDefence(player1Defence / 2 - player1Defence);
    }
    setCalDone(true);
  }
  function w21_cal() {
    //自分のぼうぎょを2倍する
    if (whoIs == "Member1") {
      console.log("w21");
      setPlayer1deltaDefence(player1Defence);
    }
    if (whoIs == "Member2") {
      console.log("w21");
      setPlayer2deltaDefence(player2Defence);
    }
    setCalDone(true);
  }
  function w22_cal() {
    //相手と自分のこうげきをそれぞれ0.33倍する
    console.log("w22");
    setPlayer2deltaAttack(player2Attack / 3 - player2Attack);
    setPlayer1deltaAttack(player1Attack / 3 - player1Attack);
    setCalDone(true);
  }
  function w23_cal() {
    //相手のこうげきを0.5倍する
    if (whoIs == "Member1") {
      console.log("w23");
      setPlayer2deltaAttack(player2Attack / 2 - player2Attack);
    }
    if (whoIs == "Member2") {
      console.log("w23");
      setPlayer1deltaAttack(player1Attack / 2 - player1Attack);
    }
    setCalDone(true);
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
    setCalDone(true);
  }
  function w31_cal() {
    //自分のこうげきを10倍、ぼうぎょを0.1倍する
    if (whoIs == "Member1") {
      console.log("w31");
      setPlayer1deltaAttack(player1Attack * 10 - player1Attack);
      setPlayer1deltaDefence(player1Defence / 10 - player1Defence);
    }
    if (whoIs == "Member2") {
      console.log("w31");
      setPlayer2deltaAttack(player2Attack * 10 - player2Attack);
      setPlayer2deltaDefence(player2Defence / 10 - player2Defence);
    }
    setCalDone(true);
  }
  function w32_cal() {
    //自分と相手のHPをそれぞれ100にする
    console.log("w32");
    setPlayer1deltaHP(100 - player1HP);
    setPlayer2deltaHP(100 - player2HP);
    setCalDone(true);
  }

  useEffect(() => {
    async function whoAmI() {
      const UUid = await getUid();
      get(child(dbRef, `Room/${roomId}/Member`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            UUid == snapshot.val().Member1 ? setWhoIs("Member1") : null;
            UUid == snapshot.val().Member2 ? setWhoIs("Member2") : null;
            setMember1Name(snapshot.val().Member1Name);
            setMember2Name(snapshot.val().Member2Name);
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
          setPlayer1Img(data.CharaImage);
          setRedirect1(false);
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
          setPlayer2Img(data.CharaImage);
          setRedirect2(false);
        } else {
          console.log("No data available");
          setRedirect2(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [redirect2]);

  ///
  async function fetchButtleStatus1() {
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
          fetchButtleStatus2();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function fetchButtleStatus2() {
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
          console.log(statusFetchDone);
          if (
            (member1Status == "foMember1Turn" &&
              member2Status == "foMember1Turn") ||
            (member1Status == "foMember2Turn" &&
              member2Status == "foMember2Turn") ||
            (member1Status == "laMember1Turn" &&
              member2Status == "laMember1Turn") ||
            (member1Status == "laMember2Turn" &&
              member2Status == "laMember2Turn")
          ) {
            setStatusFetchDone(true);
          }
          console.log(statusFetchDone);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    console.log("looking");
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
  }, [w00, w01, w02, w03]);

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

  function start() {
    const db = getDatabase();
    update(ref(db, `Room/${roomId}/MemberStatus`), {
      Member1: "selecting",
      Member2: "selecting",
    });
    setStartVisible(false);
  }

  function selected() {
    console.log("selected done");
    const db = getDatabase();
    if (whoIs == "Member1") {
      update(ref(db, `Room/${roomId}/MemberStatus`), {
        Member1: "selected",
      });
    }
    if (whoIs == "Member2") {
      update(ref(db, `Room/${roomId}/MemberStatus`), {
        Member2: "selected",
      });
    }
  }

  async function fetchButtlelog() {
    const auth = getAuth();
    console.log(roomId);
    const snapshot = get(child(dbRef, `Room/${roomId}/Buttlelog`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("available");
          const data = snapshot.val();
          setButtleLog(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function pushButtlelog(pushLog: string) {
    const newPostRef = push(child(dbRef, `Room/${roomId}/Buttlelog`), {
      Log: pushLog,
    });
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.tytle}>Room {roomId}</h1>
      <div
        style={{ visibility: youWin ? "visible" : "hidden" }}
        className={styles.message}
      >
        あなたの勝ち！
      </div>
      <div
        style={{ visibility: youLose ? "visible" : "hidden" }}
        className={styles.message}
      >
        おっつー
      </div>
      <div className={styles.parent}>
        <div className={styles.player1}>
          <div>{whoIs}</div>

          <div>{member1Status}</div>
          <h2>{Member1Name}</h2>
          <img src={player1Img}></img>
          <div className={styles.ability}>
            <h2>
              HP {player1HP} / {player1HPmax}
            </h2>
            <h2>Attack {player1Attack}</h2>
            <h2>Defence {player1Defence}</h2>
            <h2>Speed {player1Speed}</h2>
          </div>
        </div>
        <div className={styles.log}>
          {ButtleLog &&
            Object.keys(ButtleLog).length > 0 &&
            Object.keys(ButtleLog).map((key, index) => {
              return <div key={index}>{ButtleLog[key].Log}</div>;
            })}
        </div>

        <div className={styles.player2}>
          <div>{member2Status}</div>
          <h2>{Member2Name}</h2>
          <img src={player2Img}></img>
          <div className={styles.ability}>
            <h2>
              HP {player2HP} / {player2HPmax}
            </h2>
            <h2>Attack {player2Attack}</h2>
            <h2>Defence {player2Defence}</h2>
            <h2>Speed {player2Speed}</h2>
          </div>
        </div>
      </div>

      <div className={styles.command}>
        <h2>コマンドを選んでください</h2>
      </div>
      <button
        onClick={start}
        style={{ visibility: startVisible ? "visible" : "hidden" }}
      >
        Start
      </button>
      <div className={styles.leave}>
        <button onClick={leftRoom}>退室</button>
      </div>
      <div className={styles.waza}>
        <button
          className={styles.button}
          onClick={w0_cal}
          style={{ visibility: selectVisible ? "visible" : "hidden" }}
        >
          {playerw00}
        </button>
        <button
          className={styles.button}
          onClick={w1_cal}
          style={{ visibility: selectVisible ? "visible" : "hidden" }}
        >
          {playerw01}
        </button>
        <button
          className={styles.button}
          onClick={w2_cal}
          style={{ visibility: selectVisible ? "visible" : "hidden" }}
        >
          {playerw02}
        </button>
        <button
          className={styles.button}
          onClick={w3_cal}
          style={{ visibility: selectVisible ? "visible" : "hidden" }}
        >
          {playerw03}
        </button>
      </div>
    </main>
  );
}

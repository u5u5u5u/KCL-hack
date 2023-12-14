"use client";
import {useRouter} from 'next/router'
import React, { use, useState, useEffect} from "react";
import { getDatabase, ref, child, get, set, update, remove, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import React, { use, useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import { Button } from "@mui/material";

export default function Home() {
const [whoIs , setWhoIs] = useState<string>("spectators");
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

  if (member2Status == "ready"){
    setRedirect2(false);
  }

  if (member1Status == "ready" && member2Status == "ready") {
    if(whoIs == "Member1"){
      setStartVisible(true);
    }
  }
  
  if (((member1Status == "selected" && member2Status == "selected") || member1Status == "processing" )|| member2Status == "processing") {
      setChangeStatus("processing");
    }

  console.log("changed");
}, [member1Status,member2Status]);

useEffect(() => {
  if(changeStatus !=  null){
  if (whoIs == "Member1") {
    setStatus1();
  }
  if (whoIs == "Member2") {
    setStatus2();
  }
  console.log("changedone");
}
}, [changeStatus]);

async function setStatus1 ()  {
  const auth = getAuth();
  const db = getDatabase();
  update(ref(db, `Room/${roomId}/MemberStatus`), {
    Member1: changeStatus,
  });
}

async function setStatus2 ()  {
  const auth = getAuth();
  const db = getDatabase();
  if(changeStatus != "ready")
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

const w00 = () => {
  console.log("w00");
  HP1 += 100;
};
const w01 = () => {
  console.log("w01");
  HP1 += 100;
};
const w02 = () => {
  console.log("w02");
  HP1 += 100;
};
const w03 = () => {
  console.log("w03");
  HP1 += 100;
};
const w04 = () => {
  console.log("w04");
  HP1 += 100;
};
const w05 = () => {
  console.log("w05");
  HP1 += 100;
};
const w06 = () => {
  console.log("w06");
  HP1 += 100;
};
const w07 = () => {
  console.log("w07");
  HP1 += 100;
};
const w10 = () => {
  console.log("w10");
  HP1 += 100;
};
const w11 = () => {
  console.log("w11");
  HP1 += 100;
};
const w12 = () => {
  console.log("w12");
  HP1 += 100;
};
const w13 = () => {
  console.log("w13");
  HP1 += 100;
};
const w20 = () => {
  console.log("w20");
  HP1 += 100;
};
const w21 = () => {
  console.log("w21");
  HP1 += 100;
};
const w22 = () => {
  console.log("w22");
  HP1 += 100;
};
const w23 = () => {
  console.log("w23");
  HP1 += 100;
};
const w30 = () => {
  console.log("w30");
  HP1 += 100;
};
const w31 = () => {
  console.log("w31");
  HP1 += 100;
};
const w32 = () => {
  console.log("w32");
  HP1 += 100;
};
const w33 = () => {
  console.log("w33");
  HP1 += 100;
};

export default function Home() {
  const dbRef = ref(getDatabase());

useEffect(() => {
async function whoAmI ()  {
  const UUid = await getUid();
  const db = getDatabase();
  get(child(dbRef, `Room/${roomId}/Member`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            UUid == snapshot.val().Member1 ? setWhoIs("Member1"):null;
            UUid == snapshot.val().Member2 ? setWhoIs("Member2"):null;
            setRedirectWho(false);
          } else {
            console.log("No data available");
            setRedirectWho(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  whoAmI();
}, [redirectWho]);

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

  function start () {
    const db = getDatabase();
    update(ref(db, `Room/${roomId}/MemberStatus`), {
      Member1: "selecting",
      Member2: "selecting",
    });
    setStartVisible(false);
  }


  function panch () { 
    if (whoIs == "Member1") {
      if(member1Status == "selecting"){
        setChangeStatus("selected");
      }
    }
    if (whoIs == "Member2") {
      if(member2Status == "selecting"){
        setChangeStatus("selected");
      }
    }
    setSelectVisible(false);
  };

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
                Member2: null,
              });
              update(ref(db, `Room/${roomId}/ButtleStatus`), {
                Member1:{Status:player2Status},
                Member2:null
              });
              update(ref(db, `Room/${roomId}/MemberStatus`), {
                Member1:member2Status,
                Member2:null
              });
              console.log("Room left");
              router.push("/home");
            } else {
              remove(ref(db, `Room/${roomId}/`));
              console.log("Room deleted");
              console.log("Room left");
              router.push("/home");
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

    async function settest () {
      setChangeStatus("ready");
    }
    return null;
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
        <h2>HP {player2HP}</h2>
        <h2>こうげき {player2Attack}</h2>
        <h2>ぼうぎょ {player2Defence}</h2>
        <h2>すばやさ {player2Speed}</h2>
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
        <Button onClick={w00}>w00</Button>
        <Button onClick={w01}>w01</Button>
        <Button onClick={w02}>w02</Button>
        <Button onClick={w03}>w03</Button>
        <Button onClick={w04}>w04</Button>
        <Button onClick={w05}>w05</Button>
        <Button onClick={w06}>w06</Button>
        <Button onClick={w07}>w07</Button>
        <Button onClick={w10}>w10</Button>
        <Button onClick={w11}>w11</Button>
        <Button onClick={w12}>w12</Button>
        <Button onClick={w13}>w13</Button>
        <Button onClick={w20}>w20</Button>
        <Button onClick={w21}>w21</Button>
        <Button onClick={w22}>w22</Button>
        <Button onClick={w23}>w23</Button>
        <Button onClick={w30}>w30</Button>
        <Button onClick={w31}>w31</Button>
        <Button onClick={w32}>w32</Button>
        <Button onClick={w33}>w33</Button>
      </div>
      <button onClick={panch} style={{ visibility: selectVisible ? "visible" : "hidden" }}>Panch</button>
      <button onClick={start} style={{ visibility: startVisible ? "visible" : "hidden" }}>Start</button>
        <h2>ける</h2>
        <h2>にげる</h2>
      </div>
      <button onClick={settest}>
        test
      </button>
      <button onClick={leftRoom}>
        退室
      </button>
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

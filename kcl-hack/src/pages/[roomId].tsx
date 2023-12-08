"use client";
import {useRouter} from 'next/router'
import React, { use, useState, useEffect} from "react";
import { getDatabase, ref, child, get, set, update, remove, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

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
}, {
  onlyOnce: true
});

onValue(ref(db, `Room/${roomId}/MemberStatus/Member2`), (snapshot) => {
  const data = snapshot.val();
  if (data != member2Status) {
        setMember2Status(data);
        console.log(data);
      }
}, {
  onlyOnce: true
});

useEffect(() => {

  if (member2Status == "ready"){
    setRedirect2(false);
  }
  
  if (((member1Status == "ready" && member2Status == "ready") || member1Status == "selecting" )|| member2Status == "selecting") {
      setChangeStatus("selecting");
      console.log("selecting");
      setSelectVisible(true);
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
  console.log("done"+ changeStatus);
}

async function setStatus2 ()  {
  const auth = getAuth();
  const db = getDatabase();
  if(changeStatus != "ready")
  update(ref(db, `Room/${roomId}/MemberStatus`), {
    Member2: changeStatus,
  });
  console.log("done");
}



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
                Member2: null
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

    async function settest () {
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
      <button className="select1" onClick={panch} style={{ visibility: selectVisible ? "visible" : "hidden" }}>Panch</button>
        <h2>ける</h2>
        <h2>にげる</h2>
      </div>
      <button onClick={settest}>
        test
      </button>
      <button onClick={leftRoom}>
        退室
      </button>
    </main>
  );
}

"use client";

import React, { useState } from "react";
import { getDatabase, ref, child, get, set, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";

interface Member {
  Member1: string;
  Member2: string;
}

export default function Home() {
  const [number, setNum] = useState<string>();
  const [roomNum, setRoomNum] = useState<string>();
  const [member1, setMember1] = useState<string>();
  const [member2, setMember2] = useState<string>();
  const [memberUUID, setMemberUUID] = useState<Member>();
  const [roomStatus, setRoomStatus] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const dbRef = ref(getDatabase());

  const changeNum = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setNum(event.target.value);
  };

  async function getUid() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      return user.uid;
    }
  }

  const lookForRoom = async () => {
    const UUID = await getUid();
    setRoomNum(number);
    console.log(number);
    get(child(dbRef, `Room/${number}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setMemberUUID(data.Member);
          console.log(data.Member);
          const member: Member = data.Member;
          userName(member);
        } else {
          setMember1("メンバーがいません");
          setMember2("メンバーがいません");
          setVisible(true);
          setRoomStatus("empty");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const userName = async (member: Member) => {
    console.log("done");
    getMemberName1(member.Member1);
    if (member.Member2 !== undefined) {
      getMemberName2(member.Member2);
      setVisible(false);
      setRoomStatus("full");
    } else {
      setMember2("メンバーがいません");
      setVisible(true);
      setRoomStatus("P2empty");
    }
  };

  async function getMemberName1(uuid: string) {
    get(child(dbRef, `User/${uuid}/Profile/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data.Name);
          if (data.Name === undefined) {
            setMember1("名無し");
          }
          setMember1(data.Name);
        } else {
          return "名無し";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getMemberName2(uuid: string) {
    get(child(dbRef, `User/${uuid}/Profile/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data.Name);
          if (data.Name === undefined) {
            setMember2("名無し");
          }
          setMember2(data.Name);
        } else {
          return "名無し";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const join = async () => {
    if (roomStatus !== "full") {
      try {
        const UUID = await getUid();
        const db = getDatabase();
        if (roomStatus === "empty") {
          await set(ref(db, `Room/${roomNum}/Member/`), {
            Member1: UUID,
          });
        } else if (roomStatus === "P2empty") {
          await update(ref(db, `Room/${roomNum}/Member/`), {
            Member2: UUID,
          });
        }
        console.log("send");
      } catch (error) {
        console.error("エラーです:", error);
      }
    }
  };

  return (
    <main>
      <Header children="MATCHING" />
      <div className="container">
        <div className="wrapper">
          <div>
            <h2>ルームを探す</h2>
          </div>
          <div className="text-center">
            <label>
              <div>
                <input
                  value={number}
                  onChange={changeNum}
                  placeholder="ルーム番号を入力"
                />

                <button className="button" onClick={lookForRoom}>
                  検索
                </button>
              </div>
            </label>
          </div>
          <div>
            Member1:{member1}
            <br />
            Member2:{member2}
          </div>
          <div style={{ visibility: visible ? "visible" : "hidden" }}>
            <Link href="/buttle_sence">
              <button onClick={join}>PLAY</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

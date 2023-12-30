"use client";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState, useEffect } from "react";
import { getDatabase, ref, child, get, set, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import Header from "../../../../components/header/header";
import styles from "../../../../styles/matching.module.css";
import Footer from "../../../../components/footer/footer";

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
  const [ownName, setOwnName] = useState<string>();
  const [roomStatus, setRoomStatus] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const [userUUID, setUUID] = useState<string>("");
  const [userChara, setuserChara] = useState<string>("");
  const [sendStatus, setSendStatus] = useState<Object>();
  const [redirect, setRedirect] = useState<boolean>(false);
  const [JSvalied, setJSvalied] = useState<boolean>(false);
  const dbRef = ref(getDatabase());

  const changeNum = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setNum(event.target.value);
    setMember1("");
    setMember2("");
    setVisible(false);
    setRoomStatus("");
  };

  async function getUid() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      return user.uid;
    }
  }

  useEffect(() => {
    setJSvalied(true);
  }, []);

  useEffect(() => {
    async function getCharaid() {
      const UUid = await getUid();
      console.log(UUid);
      get(child(dbRef, `User/${UUid}/SelectChara/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setuserChara(data.SelectId);
            setRedirect(false);
            setUUID(UUid);
          } else {
            console.log("No data available");
            setRedirect(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getCharaid();
  }, [redirect]);

  useEffect(() => {
    get(child(dbRef, `User/${userUUID}/Charadata/${userChara}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          data.Status.HPmax = data.Status.HP;
          console.log(data);
          setSendStatus(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userChara]);

  const lookForRoom = async () => {
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

  async function getOwnName(uuid: string) {
    get(child(dbRef, `User/${uuid}/Profile/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data.Name);
          if (data.Name === undefined) {
            setOwnName("名無し");
          }
          setOwnName(data.Name);
        } else {
          setOwnName("名無し");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const join = async () => {
    if (roomStatus !== "full") {
      try {
        await getUid();
        await getOwnName(userUUID);
      } catch (error) {
        console.error("エラーです:", error);
      }
    }
  };

  useEffect(() => {
    if (ownName !== undefined) {
      const db = getDatabase();
      async function joining() {
        if (roomStatus === "empty") {
          await set(ref(db, `Room/${roomNum}/Member/`), {
            Member1: userUUID,
            Member1Name: ownName,
          });
          await set(ref(db, `Room/${roomNum}/ButtleStatus/`), {
            Member1: sendStatus,
          });
          await set(ref(db, `Room/${roomNum}/MemberStatus/`), {
            Member1: "ready",
          });
        } else if (roomStatus === "P2empty") {
          await update(ref(db, `Room/${roomNum}/Member/`), {
            Member2: userUUID,
            Member2Name: ownName,
          });
          await update(ref(db, `Room/${roomNum}/ButtleStatus/`), {
            Member2: sendStatus,
          });
          await update(ref(db, `Room/${roomNum}/MemberStatus/`), {
            Member2: "ready",
          });
        }
        handleClick();
        console.log("send");
      }
      joining();
    }
  }, [ownName]);

  const router = useRouter();
  const handleClick = () => {
    router.push(`../battle/matching/room/${roomNum}`);
  };
  if (JSvalied) {
    return (
      <main>
        <Header children="MATCHING" />
        <div
          className="container"
          style={{ visibility: JSvalied ? "visible" : "collapse" }}
        >
          <div className="wrapper">
            <div>
              <h2>ルームを探す</h2>
            </div>
            <div className="text-center">
              <label>
                <div className={styles.wrapper}>
                  <input
                    className={styles.input}
                    value={number}
                    onChange={changeNum}
                    placeholder="ルーム番号を入力"
                  />

                  <button className={styles.button} onClick={lookForRoom}>
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
              <button onClick={join}>PLAY</button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  } else {
    return (
      <main>
        <h1>please enable javascript</h1>
        <div>
          javascriptをオフにして一体何が楽しいんだ？
          <br />
          ということで、javascriptをオンにしてください。
          <br />
        </div>
      </main>
    );
  }
}

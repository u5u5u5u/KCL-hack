"use client";
import React, { useState } from "react";
import Link from "next/link";
import { getDatabase, ref, set , child, get} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import "firebase/compat/database";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  const [userName, setUsername] = useState<string>("");
  const [userIntro, setIntro] = useState<string>("");
  const [userUUID, setUUID] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const dbRef = ref(getDatabase());

  useEffect(() => {
    const fetchProfile = async () => {
      const UUID = await getUid();
      console.log(UUID);
      setUUID(UUID);
      get(child(dbRef, `User/${UUID}/Profile/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUsername(data.Name);
            setIntro(data.Content);
          } else {
            console.log("No data available");
            setRedirect(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchProfile();
  }, [redirect]);

  const changeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setUsername(event.target.value);
  };

  const changeUserIntro = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setIntro(event.target.value);
  };

  async function getUid() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      return user.uid;
    }
  }

  const sendProfile = async () => {
    try {
      const UUID = await getUid();
      const db = getDatabase();
      await set(ref(db, `User/${UUID}/Profile/`), {
        Name: userName,
        Content : userIntro
      });
      console.log("send");
    } catch (error) {
      console.error("エラーです:", error);
    }
  };


  return (
    <main>
      <Header children="PROFILE" />
      <div className="container">
        <div className="wrapper">
          <div>
            <Link href="/hoge">
              <button>設定</button>
            </Link>
          </div>
            <div>
              <h2>ユーザーネーム</h2>
            </div>
            <div className="text-center">
              <label>
                <input
                  type="text"
                  value={userName}
                  onChange={changeUserName}
                ></input>
              </label>
            </div>
            <div>
              <h2>一言</h2>
            </div>
            <div>
              <label>
                <input
                  className="text-4xl text-blue-500 mx-5"
                  placeholder=" よろしくお願いします"
                  type="text"
                  value={userIntro}
                  onChange={changeUserIntro}
                  ></input>
                <input
                  className="text-3xl border rounded-2xl p-2"
                  type="submit"
                  value="決定"
                  onClick={sendProfile}
                ></input>
              </label>
            </div>
          <div>
            <Link href="/home">
              <button>戻る</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

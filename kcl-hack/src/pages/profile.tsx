"use client";
import React, { useState } from "react";
import Link from "next/link";
import { getDatabase, ref, set , child, get} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { fail } from "assert";
import "firebase/compat/database";

export default function Home() {
  const [userName, setUsername] = useState<string>("");
  const [userIntro, setIntro] = useState<string>("");
  const dbRef = ref(getDatabase());

  useEffect(() => {
    const fetchProfile = async () => {
      const UUID = await getUid();
      get(child(dbRef, `User/${UUID}/Profile/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUsername(data.name);
            setIntro(data.content);
          } else {
            console.log("No data available");
            const fail = 1;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchProfile();
  }, [fail]);

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
        name: userName,
        content : userIntro
      });
      console.log("send");
    } catch (error) {
      console.error("エラーです:", error);
    }
  };

  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col">
          <div className="text-center text-6xl my-10">
            <Link href="/hoge">
              <button>設定</button>
            </Link>
          </div>
          <form action="#" method="post">
            <div className="text-center text-3xl my-3">
              <h2>ユーザーネーム</h2>
            </div>
            <div className="text-center">
              <label>
                <input
                  className="text-4xl text-blue-500 mx-5"
                  type="text"
                  value={userName}
                  onChange={changeUserName}
                ></input>
              </label>
            </div>
            <div className="text-center text-3xl my-3">
              <h2>一言</h2>
            </div>
            <div className="text-center">
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
          </form>
          <div className="text-center text-3xl my-5">
            <Link href="/home">
              <button>戻る</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

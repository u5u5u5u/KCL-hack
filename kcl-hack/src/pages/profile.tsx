"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/header";

export default function Home() {
  const [userName, setUsername] = useState<string>("");

  const changeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setUsername(event.target.value);
  };
  return (
    <main>
      <Header children="PROFILE" />
      <div className="container">
        <div className="wrapper">
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
                <input
                  className="text-3xl border rounded-2xl p-2"
                  type="submit"
                  value="決定"
                ></input>
              </label>
            </div>
            <div className="text-center text-3xl my-3">
              <h2>一言</h2>
            </div>
            <div className="text-center">
              <label>
                <textarea
                  className="text-4xl text-blue-500 mx-5"
                  placeholder=" よろしくお願いします"
                ></textarea>
                <input
                  className="text-3xl border rounded-2xl p-2"
                  type="submit"
                  value="決定"
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

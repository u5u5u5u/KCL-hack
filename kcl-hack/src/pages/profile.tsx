"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

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
          <div>
            <Link href="/hoge">
              <button>設定</button>
            </Link>
          </div>
          <form action="#" method="post">
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
                <input type="submit" value="決定"></input>
              </label>
            </div>
            <div>
              <h2>一言</h2>
            </div>
            <div>
              <label>
                <textarea placeholder="よろしくお願いします"></textarea>
                <input type="submit" value="決定"></input>
              </label>
            </div>
          </form>
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

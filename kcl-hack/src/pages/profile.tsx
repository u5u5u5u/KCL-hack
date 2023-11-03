"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [userName, setUsername] = useState<string>("");

  const changeUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setUsername(event.target.value);
  };
  return (
    <main>
      <Link href="/hoge">
        <div className="text-center">
          <button className="text-3xl text-blue-500">設定</button>
        </div>
      </Link>

      <form action="#" method="post">
        <div className="text-center">
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
        <div className="text-center">
          <h2> ひとこと</h2>
        </div>
        <div className="text-center">
          <label>
            <textarea placeholder="よろしくおねがいします"></textarea>
            <input type="submit" value="決定"></input>
          </label>
        </div>
      </form>
    </main>
  );
}

"use client";
import Link from "next/link";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col">
          <h2 className="text-8xl text-center font-mono my-10">SCAN</h2>
          <div className="flex justify-center items-stretch">
            <div className="text-5xl border rounded-2xl px-3 mx-5 py-5 my-5">
              <Link href="/camera">
                <button>読み取り</button>
              </Link>
            </div>
            <div className="text-5xl border rounded-2xl px-5 mx-10 py-5 my-5">
              <Link href="/scan/search">
                <button>入力</button>
              </Link>
            </div>
          </div>
          <div className="text-3xl text-center my-10">
            <Link href="/home">
              <button>戻る</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

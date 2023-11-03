"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-9xl text-red-600 text-center font-serif italic">
            BAGOLA;
          </h1>
          <div className="text-center mt-20">
            <Link href="/login">
              <button className="text-3xl text-blue-500 font-mono">
                ログイン
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Link href="/home">
          <button>ホームへ</button>
        </Link>
      </div>
    </main>
  );
}

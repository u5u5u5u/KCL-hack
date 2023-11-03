"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col">
          <div className="text-center my-10">
            <Link href="/profile">
              <button className="text-6xl text-blue-500 font-mono">
                プロフィール
              </button>
            </Link>
          </div>
          <div className="text-center my-10">
            <Link href="/scan/scan-select">
              <button className="text-6xl text-blue-500 font-mono">
                スキャン
              </button>
            </Link>
          </div>
          <div className="text-center my-10">
            <Link href="/hoge">
              <button className="text-6xl text-blue-500 font-mono">設定</button>
            </Link>
          </div>
          <div className="text-center my-10">
            <Link href="/battle">
              <button className="text-6xl text-blue-500 font-mono">対戦</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/hoge">
        <div className="text-center">
          <button className="text-3xl text-blue-500">マッチング</button>
        </div>
      </Link>
      <Link href="/hoge">
        <div className="text-center">
          <button className="text-3xl text-blue-500">キャラ一覧</button>
        </div>
      </Link>
      <Link href="/hoge">
        <div className="text-center">
          <button className="text-3xl text-blue-500">設定</button>
        </div>
      </Link>
    </main>
  );
}

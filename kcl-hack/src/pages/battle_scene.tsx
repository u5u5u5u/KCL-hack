"use client";
import React, { useState } from "react";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <div className="p-10 text-red-500 float-right">
        <h2 className="text-4xl p-10">ユーザーネーム</h2>
        <h2>HP</h2>
        <h2>こうげき</h2>
        <h2>ぼうぎょ</h2>
        <h2>すばやさ</h2>
      </div>
      <div className="p-10 text-blue-600">
        <h2 className="text-4xl p-10">ユーザーネーム</h2>
        <h2>HP</h2>
        <h2>こうげき</h2>
        <h2>ぼうぎょ</h2>
        <h2>すばやさ</h2>
      </div>
      <div className="text-center p-10">
        <h2>コマンドを選んでください</h2>
      </div>
      <div className="text-center text-3xl">
        <h2>なぐる</h2>
        <h2>ける</h2>
        <h2>にげる</h2>
      </div>
    </main>
  );
}

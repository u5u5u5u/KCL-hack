"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h2 className="text-center">SCAN</h2>
      <div className="flex justify-center items-stretch">
        <div className="px-4 py-4">
          <Link href="/search">
            <button>読み取り</button>
          </Link>
        </div>
        <div className="px-4 py-4">
          <Link href="/search">
            <button>入力</button>
          </Link>
        </div>
      </div>
      <div className="text-center">
        <Link href="/home">
          <button>戻る</button>
        </Link>
      </div>
    </main>
  );
}

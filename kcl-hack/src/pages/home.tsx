"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="wrapper">
          <div className="content">
            <Link href="/profile">
              <button className="advance-button">プロフィール</button>
            </Link>
          </div>
          <div className="content">
            <Link href="/scan/scan-select">
              <button className="advance-button">スキャン</button>
            </Link>
          </div>
          <div className="content">
            <Link href="/hoge">
              <button className="advance-button">設定</button>
            </Link>
          </div>
          <div className="content">
            <Link href="/battle">
              <button className="advance-button">対戦</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

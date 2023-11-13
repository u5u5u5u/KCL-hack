"use client";
import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import Button from "../components/button";

export default function Home() {
  return (
    <main>
      <Header children="BATTLE" />
      <div className="container">
        <ul className="wrapper">
          <li className="content">
            <Link href="/battle_scene">
              <Button label="Matching" />
            </Link>
          </li>

          <li className="content">
            <Link href="/box">
              <Button label="Characters" />
            </Link>
          </li>
          <li className="content">
            <Link href="/hoge">
              <button className="text-3xl text-blue-500">設定</button>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

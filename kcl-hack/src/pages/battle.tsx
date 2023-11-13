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
          <Link href="/battle_scene">
            <li className="text-center">
              <Button label="Matching" />
            </li>
          </Link>
          <Link href="/box">
            <li className="text-center">
              <Button label="Characters" />
            </li>
          </Link>
          <Link href="/hoge">
            <li className="text-center">
              <button className="text-3xl text-blue-500">設定</button>
            </li>
          </Link>
        </ul>
      </div>
    </main>
  );
}

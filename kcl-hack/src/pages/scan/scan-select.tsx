"use client";
import React, { useState } from "react";
import Link from "next/link";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col">
          <h2 className="text-7xl text-center font-mono my-10">SCAN</h2>
          <div className="flex justify-center items-stretch">
            <div className="text-5xl border px-5 mx-5 py-5 my-5">
              <Link href="/scan/search">
                <button>読み取り</button>
              </Link>
            </div>
            <div className="text-5xl mx-20 my-5">
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

"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-9xl text-red-600 text-center italic">BAGOLA;</h1>
      <Link href="/login">
        <div className="text-center">
          <button className="text-3xl text-blue-500">ログイン</button>
        </div>
      </Link>
    </main>
  );
}

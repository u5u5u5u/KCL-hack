"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="center color-red">BAGOLA;</h1>
      <Link href="/search" className="center">
        <button>ログイン</button>
      </Link>
    </main>
  );
}

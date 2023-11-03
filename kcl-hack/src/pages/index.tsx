"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/login">
        <button>scanへ移動する</button>
      </Link>
    </main>
  );
}

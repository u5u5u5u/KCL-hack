"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h2>BAGOLA</h2>
      <Link href="/search">
        <button>login</button>
      </Link>
    </main>
  );
}

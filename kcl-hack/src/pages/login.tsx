"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <div className="text-center">
          <Link href="/google">
            <button className="text-6xl text-blue-500 font-mono mx-10">
              signIn
            </button>
          </Link>
        </div>
        <div className="text-center">
          <Link href="/google">
            <button className="text-6xl text-blue-500 font-mono mx-10">
              signUp
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

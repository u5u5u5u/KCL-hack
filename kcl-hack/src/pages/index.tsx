"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="wrapper">
          <h1 className="main-title">
            <span className="main-title-text">BAGOLA</span>;
          </h1>
          <div className="content">
            <Link href="/login">
              <button className="advance-button">logIn</button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Link href="/home">
          <button>ホームへ</button>
        </Link>
      </div>
    </main>
  );
}

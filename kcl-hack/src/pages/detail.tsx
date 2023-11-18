"use client";
import React, { useState } from "react";

var name = "たま";
var attack = 999999;
var HP = 200;
var defence = 25;
var speed = 10;
export default function Home() {
  return (
    <main>
      <div>
        <h2>名前 {name}</h2>
        <h2>HP {HP}</h2>
        <h2>こうげき {attack}</h2>
        <h2>ぼうぎょ {defence}</h2>
        <h2>すばやさ {speed}</h2>
      </div>
    </main>
  );
}

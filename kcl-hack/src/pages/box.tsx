"use client";
import React, { useState } from "react";
import Link from "next/link";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";

const dbRef = ref(getDatabase());

async function getUid() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    return user.uid;
  }
}

async function getCharacter() {
  const UUID = await getUid();
  get(child(dbRef, `User/${UUID}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export default function Home() {
  return (
    <main>
      <button onClick={getCharacter}> 読み込み</button>
      <div className="flex flex-col pb-52">
        <h1 className="text-9xl text-red-600 text-center">キャラ一覧だを</h1>
      </div>
      <div className="px-20 flex-wrap flex">
        <div className="w-80 h-80 px-10 py-1">
          <Link href="/detail">
            <img src="https://farm5.static.flickr.com/4011/4504949513_df8494b480_o.jpg"></img>
          </Link>
        </div>
        <div className="w-80 h-80 px-10 py-1">
          <img src="https://farm5.static.flickr.com/4011/4504949513_df8494b480_o.jpg"></img>
        </div>
        <div className="w-80 h-80 px-10 py-1">
          <img src="https://farm5.static.flickr.com/4011/4504949513_df8494b480_o.jpg"></img>
        </div>
        <div className="w-80 h-80 px-10 py-1">
          <img src="https://farm5.static.flickr.com/4011/4504949513_df8494b480_o.jpg"></img>
        </div>
        <div className="w-80 h-80 px-10 py-1">
          <img src="https://farm5.static.flickr.com/4011/4504949513_df8494b480_o.jpg"></img>
        </div>
        <div className="w-80 h-80 px-10 py-1">
          <img src="https://farm5.static.flickr.com/4011/4504949513_df8494b480_o.jpg"></img>
        </div>
        <div className="w-80 h-80 px-10 py-1">
          <img src="https://farm5.static.flickr.com/4011/4504949513_df8494b480_o.jpg"></img>
        </div>
      </div>
      <Link href="/battle">
        <div className="text-center">
          <button className="text-3xl text-blue-500">戻りません</button>
        </div>
      </Link>
    </main>
  );
}

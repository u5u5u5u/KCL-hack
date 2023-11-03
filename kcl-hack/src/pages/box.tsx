"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
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

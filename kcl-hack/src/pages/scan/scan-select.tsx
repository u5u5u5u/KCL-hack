"use client";
import React, { useState } from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col">
          <h2 className="text-7xl text-center font-mono my-20">SCAN</h2>
          <div className="flex justify-center items-stretch">
            <Stack spacing={2} direction="row">
              <Link href="/scan/search">
                <Button className="text-4xl p-5 mx-10" variant="outlined">
                  読み取り
                </Button>
              </Link>
            </Stack>

            <Stack spacing={2} direction="row">
              <Link href="/scan/search">
                <Button className="text-4xl p-5 mx-20" variant="outlined">
                  入力
                </Button>
              </Link>
            </Stack>
          </div>
          <div className="text-3xl text-center my-20">
            <Link href="/home">
              <button>戻る</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { fail } from "assert";

interface Character {
  Attack: number;
  CharaImage: string;
  Defence: number;
  HP: number;
  Speed: number;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [Jan, setJan] = useState<number>();
  const dbRef = ref(getDatabase());

  async function getUid() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      return user.uid;
    }
  }

  useEffect(() => {
    const fetchCharacters = async () => {
      const UUID = await getUid();
      get(child(dbRef, `User/${UUID}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setCharacters(Object.values(data));
          } else {
            console.log("No data available");
            const fail = 1;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchCharacters();
  }, [fail]);

  const selectCharacters = (selectJan: number) => {
    setJan(selectJan);
    console.log(selectJan);
  };

  return (
    <main>
      <div className="flex flex-col pb-52">
        <h1 className="text-9xl text-red-600 text-center">キャラ一覧だを</h1>
      </div>
      <div className="px-20 flex-wrap flex">
        {characters.map((character, index) => (
          <div key={index}>
            <img src={character.CharaImage} alt="Character" />
            <p>Attack: {character.Attack}</p>
            <p>Defence: {character.Defence}</p>
            <p>HP: {character.HP}</p>
            <p>Speed: {character.Speed}</p>
            <button onClick={() => selectCharacters(index)}>選択する</button>
          </div>
        ))}
      </div>
      <Link href="/battle">
        <div className="text-center">
          <button className="text-3xl text-blue-500">戻りません</button>
        </div>
      </Link>
    </main>
  );
}

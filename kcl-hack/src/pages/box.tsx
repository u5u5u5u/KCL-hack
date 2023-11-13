"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { fail } from "assert";

interface Status {
  Attack: number;
  CharaImage: string;
  Defence: number;
  HP: number;
  Speed: number;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState(null);
  const [characters, setCharacters] = useState({});
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
      get(child(dbRef, `User/${UUID}/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setCharacters(data.Charadata);
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

  const handleClick = (id) => {
    setSelectedId(id);
    console.log(`Selected ID: ${id}`);
  };

  const sendSelectedId = async () => {
    try {
      const UUID = await getUid();
      const db = getDatabase();
      await set(ref(db, `User/${UUID}/SelectChara`), {
        SelectId: selectedId,
      });
      console.log("send");
    } catch (error) {
      console.error("エラーです:", error);
    }
  };

  return (
    <main>
      <div className="flex flex-col pb-52">
        <h1 className="text-9xl text-red-600 text-center">キャラ一覧だを</h1>
      </div>
      <div className="px-20 flex-wrap flex">
        <div>
          {Object.entries(characters).map(([id, chara]) => (
            <div key={id}>
              <h2>{chara.Status.Name}</h2>
              <img src={chara.Status.CharaImage} alt={chara.Status.Name} />
              <p>Attack: {chara.Status.Attack}</p>
              <p>Defence: {chara.Status.Defence}</p>
              <p>HP: {chara.Status.HP}</p>
              <p>Speed: {chara.Status.Speed}</p>
              <button onClick={() => handleClick(id)}>Select</button>
            </div>
          ))}
          {selectedId && <p>Selected ID: {selectedId}</p>}
        </div>
        <button onClick={sendSelectedId}>決定</button>
      </div>
      <Link href="/battle">
        <div className="text-center">
          <button className="text-3xl text-blue-500">戻りません</button>
        </div>
      </Link>
    </main>
  );
}

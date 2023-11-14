"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { fail } from "assert";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "../components/box.module.css";

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

  const handleClick = (id: any) => {
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
      <Header children="キャラ一覧だを" />
      <div>
        {/* CSS適用されてない */}
        <div className={styles.wrapper}>
          {Object.entries(characters).map(([id, chara]: any) => (
            <div key={id}>
              <p>{chara.Status.Name}</p>
              <img src={chara.Status.CharaImage} alt={chara.Status.Name} />
              <table>
                <tr>
                  <td>Attack:</td>
                  <td>{chara.Status.Attack}</td>
                </tr>
                <tr>
                  <td>Defence:</td>
                  <td>{chara.Status.Defence}</td>
                </tr>
                <tr>
                  <td>HP:</td>
                  <td>{chara.Status.HP}</td>
                </tr>
                <tr>
                  <td>Speed:</td>
                  <td>{chara.Status.Speed}</td>
                </tr>
              </table>
              <button onClick={() => handleClick(id)}>Select</button>
            </div>
          ))}
          {selectedId && <p>Selected ID: {selectedId}</p>}
        </div>
        <button onClick={sendSelectedId}>決定</button>
      </div>
      <Link href="/battle">
        <div>
          <button>戻りません</button>
        </div>
      </Link>
      <Footer />
    </main>
  );
}

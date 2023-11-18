"use client";
import React, { useState, useEffect } from "react";
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
      <div className={styles.wrapper}>
        {Object.entries(characters).map(([id, chara]: any) => (
          <div className={styles.content} key={id}>
            <div className={styles.name}>
              <h1>{chara.Status.Name}</h1>
            </div>
            <div className={styles.image_box}>
              <img
                className={styles.image}
                src={chara.Status.CharaImage}
                alt={chara.Status.Name}
              />
            </div>
            <table className={styles.status}>
              <tr>
                <td className={styles.data1}>Attack:</td>
                <td className={styles.data2}>{chara.Status.Attack}</td>
              </tr>
              <tr>
                <td className={styles.data1}>Defence:</td>
                <td className={styles.data2}>{chara.Status.Defence}</td>
              </tr>
              <tr>
                <td className={styles.data1}>HP:</td>
                <td className={styles.data2}>{chara.Status.HP}</td>
              </tr>
              <tr>
                <td className={styles.data1}>Speed:</td>
                <td className={styles.data2}>{chara.Status.Speed}</td>
              </tr>
            </table>
            <div className={styles.button_box}>
              <button className={styles.button} onClick={() => handleClick(id)}>
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedId && (
        <div>
          <div className={styles.select_id}>Selected ID: {selectedId}</div>
          <div className={styles.button_box}>
            <button className="button" onClick={sendSelectedId}>
              決定
            </button>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}

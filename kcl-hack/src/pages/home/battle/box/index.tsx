"use client";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import Header from "../../../../components/header/header";
import Footer from "../../../../components/footer/footer";
import styles from "../../../../styles/box.module.css";

interface Status {
  Attack: number;
  CharaImage: string;
  Defence: number;
  HP: number;
  Speed: number;
  wa01: string;
  wa02: string;
  wa03: string;
  wa04: string;
}

export default function Home() {
  const [selectedId, setSelectedId] = useState(null);
  const [characters, setCharacters] = useState(Object);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [JSvalid, setJSvalid] = useState<boolean>(false);
  const [UUID, setUUID] = useState<string>("");

  const dbRef = ref(getDatabase());

  useEffect(() => {
    setJSvalid(true);
  }, []);

  async function getUid() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      setUUID(user.uid);
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
            setRedirect(false);
            setDeleted(false);
          } else {
            console.log("No data available");
            setRedirect(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchCharacters();
  }, [redirect, deleted]);

  useEffect(() => {
    Object.values(characters).forEach(function (val: any) {
      const newCharacters = { ...characters };
      const w0 = val.Status.w00;
      const w1 = val.Status.w01;
      const w2 = val.Status.w02;
      const w3 = val.Status.w03;
      let change: boolean = false;
      if (
        val.Status.w00_name === undefined &&
        val.Status.w01_name === undefined &&
        val.Status.w02_name === undefined &&
        val.Status.w03_name === undefined
      ) {
        if (w0 == 0) {
          val.Status.w00_name = "たたく";
          val.Status.w00_desc = "相手に1倍ダメージを与える";
          change = true;
        } else if (w0 == 1) {
          val.Status.w00_name = "ちゅーちゅーする";
          val.Status.w00_desc =
            "相手に0.5倍ダメージを与え、与えたダメージの0.5倍自分を回復する";
          change = true;
        } else if (w0 == 2) {
          val.Status.w00_name = "ぜんりょくこうげき";
          val.Status.w00_desc =
            "相手に2倍ダメージを与え、相手が自分に1倍ダメージを与える";
          change = true;
        } else if (w0 == 3) {
          val.Status.w00_name = "じばく";
          val.Status.w00_desc = "相手に5倍ダメージを与え、自分のHPを0にする";
          change = true;
        } else if (w0 == 4) {
          val.Status.w00_name = "ぺちぺちする";
          val.Status.w00_desc =
            "相手に0.25倍ダメージを与え、自分のこうげきを2倍にする";
          change = true;
        } else {
          val.Status.w00_name = "エラーです";
        }
        if (w1 == 0) {
          val.Status.w01_name = "ねる";
          val.Status.w01_desc = "自分の1倍attackぶん自分を回復する";
          change = true;
        } else if (w1 == 1) {
          val.Status.w01_name = "ぐっすりねる";
          val.Status.w01_desc = "自分のHP上限の0.5倍自分を回復する";
          change = true;
        } else if (w1 == 2) {
          val.Status.w01_name = "ぜっき";
          val.Status.w01_desc =
            "自分のHPを全回復し、自分のこうげきとぼうぎょをそれぞれ0.5倍する";
          change = true;
        } else {
          val.Status.w01_name = "エラーです";
        }
        if (w2 == 0) {
          val.Status.w02_name = "ちょうはつ";
          val.Status.w02_desc = "相手のこうげきを2倍、ぼうぎょを0.5倍する";
          change = true;
        } else if (w2 == 1) {
          val.Status.w02_name = "ひきこもる";
          val.Status.w02_desc = "自分のぼうぎょを2倍する";
          change = true;
        } else if (w2 == 2) {
          val.Status.w02_name = "こわいおにいさんをつれてくる";
          val.Status.w02_desc = "相手と自分のこうげきをそれぞれ0.33倍する";
          change = true;
        } else if (w2 == 3) {
          val.Status.w02_name = "にらむ";
          val.Status.w02_desc = "相手のこうげきを0.5倍する";
          change = true;
        } else {
          val.Status.w02_name = "エラーです";
        }
        if (w3 == 0) {
          val.Status.w03_name = "ざんねんでしたー";
          val.Status.w03_desc = "自分のHP上限、HPをそれぞれ相手と入れ替える";
          change = true;
        } else if (w3 == 1) {
          val.Status.w03_name = "ぎあちぇんじ";
          val.Status.w03_desc = "自分のこうげきを10倍、ぼうぎょを0.1倍する";
          change = true;
        } else if (w3 == 2) {
          val.Status.w03_name = "みちづれ";
          val.Status.w03_desc = "自分と相手のHPをそれぞれ100にする";
          change = true;
        } else {
          val.Status.w03_name = "エラーです";
        }
      }
      if (change) {
        setCharacters(newCharacters);
      }
    });
  }, [characters]);

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
      setSelectedId(null);
      console.log("send");
    } catch (error) {
      console.error("エラーです:", error);
    }
  };

  const deleteChara = async () => {
    try {
      const UUID = await getUid();
      const db = getDatabase();
      await remove(ref(db, `User/${UUID}/Charadata/${selectedId}`));
      setDeleted(true);
      setSelectedId(null);
      console.log("deleted");
    } catch (error) {
      console.error("エラーです:", error);
    }
  };

  if (JSvalid) {
    if (UUID != undefined) {
      return (
        <main>
          <Header children="BOX" />
          <div className={styles.wrapper}>
            {Object.entries(characters).map(([id, chara]: any) => (
              <button
                className={styles.content}
                key={id}
                onClick={() => handleClick(id)}
              >
                <div className={styles.back}>
                  <ul className={styles.actions}>
                    <li>
                      <p className={styles["action-name"]}>
                        {chara.Status.w00_name}
                      </p>
                      <p className={styles["action-description"]}>
                        {chara.Status.w00_desc}
                      </p>
                    </li>
                    <li>
                      <p className={styles["action-name"]}>
                        {chara.Status.w01_name}
                      </p>
                      <p className={styles["action-description"]}>
                        {chara.Status.w01_desc}
                      </p>
                    </li>
                    <li>
                      <p className={styles["action-name"]}>
                        {chara.Status.w02_name}
                      </p>
                      <p className={styles["action-description"]}>
                        {chara.Status.w02_desc}
                      </p>
                    </li>
                    <li>
                      <p className={styles["action-name"]}>
                        {chara.Status.w03_name}
                      </p>
                      <p className={styles["action-description"]}>
                        {chara.Status.w03_desc}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className={styles.front}>
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
                      <td className={styles.data1}>HP</td>
                      <td className={styles.data2}>{chara.Status.HP}</td>
                    </tr>
                    <tr>
                      <td className={styles.data1}>Attack</td>
                      <td className={styles.data2}>{chara.Status.Attack}</td>
                    </tr>
                    <tr>
                      <td className={styles.data1}>Defence</td>
                      <td className={styles.data2}>{chara.Status.Defence}</td>
                    </tr>
                    <tr>
                      <td className={styles.data1}>Speed</td>
                      <td className={styles.data2}>{chara.Status.Speed}</td>
                    </tr>
                  </table>
                </div>
              </button>
            ))}
          </div>
          {selectedId && (
            <div>
              <div className={styles["select-id"]}>
                Selected ID: {selectedId}
              </div>
              <div className={styles.button_box}>
                <button
                  className={styles.button}
                  onClick={() => {
                    sendSelectedId();
                    alert("キャラクターを選択しました");
                  }}
                >
                  決定
                </button>
                <button
                  className={styles.button}
                  onClick={() => {
                    deleteChara();
                    alert("キャラクターを削除しました");
                  }}
                >
                  削除
                </button>
              </div>
            </div>
          )}
          <Footer />
        </main>
      );
    } else {
      return (
        <main>
          <Header children="BOX" />
          <h1>ログインをやり直してください</h1>
        </main>
      );
    }
  } else {
    return (
      <main>
        <h1>Please enable javascript</h1>
        <div>
          技の名前がちょっと変なのはやつに技の命名を任せた私の責任でもある。見たくない気持ちも分かるがいつかjavascriptをオンにして向き合う時が来る。
          <br />
          ということで、javascriptをオンにしてください。
        </div>
      </main>
    );
  }
}

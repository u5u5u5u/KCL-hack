"use client";
import { useState, ChangeEvent } from "react";
import { YAHOO_API_KEY } from "../../constant/env";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import "firebase/compat/database";
import Header from "../../components/header";
import styles from "../../components/search.module.css";
import Footer from "../../components/footer";

export default function Home() {
  //status
  const [Hp, setHP] = useState<number>();
  const [Attack, setAttack] = useState<number>();
  const [Defence, setDefence] = useState<number>();
  const [Speed, setSpeed] = useState<number>();
  const [Jan, setJan] = useState<number>();

  const [number, setNum] = useState<number>();
  const [name, setNam] = useState<string>("");
  const [price, setPri] = useState<number>();
  const [image, setIma] = useState<string>("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function jan_get(jan: number) {
    var HP = 0;
    var attack = 0;
    var defence = 0;
    var speed = 0;
    var w0 = 0;
    var w1 = 0;
    var w2 = 0;
    var w3 = 0;
    if (jan > 99999999) {
      var jan013 = jan % 10;
      var jan012 = ((jan % 100) - jan013) / 10;
      var jan011 = ((jan % 1000) - jan013 - jan012 * 10) / 100;
      var jan010 = ((jan % 10000) - jan013 - jan012 * 10 - jan011 * 100) / 1000;
      var jan009 =
        ((jan % 100000) - jan013 - jan012 * 10 - jan011 * 100 - jan010 * 1000) /
        10000;
      var jan008 =
        ((jan % 1000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000) /
        100000;
      var jan007 =
        ((jan % 10000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000) /
        1000000;
      var jan006 =
        ((jan % 100000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000) /
        10000000;
      var jan005 =
        ((jan % 1000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000) /
        100000000;
      var jan004 =
        ((jan % 10000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000) /
        1000000000;
      var jan003 =
        ((jan % 100000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000 -
          jan004 * 1000000000) /
        10000000000;
      var jan002 =
        ((jan % 1000000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000 -
          jan004 * 1000000000 -
          jan003 * 10000000000) /
        100000000000;
      var jan001 =
        ((jan % 10000000000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000 -
          jan006 * 10000000 -
          jan005 * 100000000 -
          jan004 * 1000000000 -
          jan003 * 10000000000 -
          jan002 * 100000000000) /
        1000000000000;

      HP =
        ((jan006 * 10000 +
          jan008 * 1000 +
          jan007 * 100 +
          jan009 * 10 +
          jan004) %
          1999) +
        1000;
      attack =
        ((jan005 * 10000 +
          jan001 * 1000 +
          jan011 * 100 +
          jan003 * 10 +
          jan012) %
          499) +
        100;
      defence =
        ((jan007 * 1000 + jan005 * 100 + jan002 * 10 + jan001) % 499) + 100;
      speed = ((jan008 * 100 + jan010 * 10 + jan005) % 97) + 50;
      w0 = (jan005 + jan003 * jan002 - jan005) % 5;
      w1 = (jan013 + jan011 * jan006 - jan002) % 3;
      w2 = (jan009 + jan003 * jan008 - jan004) % 4;
      w3 = (jan001 + jan006 * jan010 - jan007) % 3;
    }
    if (jan <= 99999999) {
      var jan013 = jan % 10;
      var jan012 = ((jan % 100) - jan013) / 10;
      var jan011 = ((jan % 1000) - jan013 - jan012 * 10) / 100;
      var jan010 = ((jan % 10000) - jan013 - jan012 * 10 - jan011 * 100) / 1000;
      var jan009 =
        ((jan % 100000) - jan013 - jan012 * 10 - jan011 * 100 - jan010 * 1000) /
        10000;
      var jan008 =
        ((jan % 1000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000) /
        100000;
      var jan007 =
        ((jan % 10000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000) /
        1000000;
      var jan006 =
        ((jan % 100000000) -
          jan013 -
          jan012 * 10 -
          jan011 * 100 -
          jan010 * 1000 -
          jan009 * 10000 -
          jan008 * 100000 -
          jan007 * 1000000) /
        10000000;
      jan005 = 0;
      jan004 = 0;
      jan003 = 0;
      jan002 = 0;
      jan001 = 0;

      HP =
        ((jan012 * 10000 +
          jan008 * 1000 +
          jan007 * 100 +
          jan009 * 10 +
          jan009) %
          1999) +
        1000;
      attack =
        ((jan011 * 10000 +
          jan009 * 1000 +
          jan011 * 100 +
          jan010 * 10 +
          jan012) %
          499) +
        100;
      defence =
        ((jan007 * 1000 + jan007 * 100 + jan010 * 10 + jan008) % 499) + 100;
      speed = ((jan008 * 100 + jan010 * 10 + jan006) % 97) + 50;
      w0 = (jan006 + jan007 * jan012 - jan013) % 5;
      w1 = (jan013 + jan011 * jan006 - jan008) % 3;
      w2 = (jan009 + jan010 * jan008 - jan009) % 4;
      w3 = (jan007 + jan006 * jan010 - jan011) % 3;
    }
    setHP(HP);
    setAttack(attack);
    setDefence(defence);
    setSpeed(speed);
    setJan(number);
  }
  const changeNum = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setNum(event.target.value);
  };

  async function fetchname() {
    try {
      const res = await fetch(
        `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${YAHOO_API_KEY}&jan_code=${number}`
      );
      if (!res.ok) {
        throw new Error("fetchに失敗しました");
      }
      const data = await res.json();
      console.log(data);
      setNam(data.hits[0].name);
      setPri(data.hits[0].price);
      setIma(data.hits[0].image.small);
      jan_get(Number(number));
    } catch (error) {
      console.error("エラーです:", error);
    }
  }

  async function getUid() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      return user.uid;
    }
  }

  const sendStatus = async () => {
    try {
      const UUID = await getUid();
      const db = getDatabase();
      await set(ref(db, `User/${UUID}/Charadata/${Jan}/Status`), {
        Name: name,
        HP: Hp,
        Attack: Attack,
        Defence: Defence,
        Speed: Speed,
        CharaImage: image,
      });
      console.log("send");
    } catch (error) {
      console.error("エラーです:", error);
    }
  };

  const sendNum = () => {
    console.log(number);
    fetchname();
    setNam("");
    setNum("");
    setIma("");
    setPri("");
  };

  return (
    <main>
      <Header children="入力" />
      <div className="container">
        <div className="wrapper">
          <div>
            <input
              value={number}
              onChange={changeNum}
              placeholder="JANコード"
            />
            <button
              className={styles.button}
              aria-hidden={isOpen}
              onClick={sendNum}
            >
              検索
            </button>
          </div>
          <div role="group">
            <div id="contents" className="accordion-body" aria-hidden={!isOpen}>
              <div className={styles.image}>
                <img src={image} />
              </div>
              <ul>
                <li>商品名 : {name}</li>
                <li>価格 : {price}円</li>
              </ul>
              <table className={styles.status}>
                <tbody>
                  <tr>
                    <td className={styles.data1}>Jan Code</td>
                    <td className={styles.data2}>{Jan}</td>
                  </tr>
                  <tr>
                    <td className={styles.data1}>HP</td>
                    <td className={styles.data2}>{Hp}</td>
                  </tr>
                  <tr>
                    <td className={styles.data1}>Attack</td>
                    <td className={styles.data2}>{Attack}</td>
                  </tr>
                  <tr>
                    <td className={styles.data1}>Defence</td>
                    <td className={styles.data2}>{Defence}</td>
                  </tr>
                  <tr>
                    <td className={styles.data1}>Speed</td>
                    <td className={styles.data2}>{Speed}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className={styles.registration_button}
                onClick={sendStatus}
              >
                登録
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .accordion-body {
          height: ${isOpen ? "auto" : 0};
          transition: height 0.3s ease-out;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </main>
  );
}

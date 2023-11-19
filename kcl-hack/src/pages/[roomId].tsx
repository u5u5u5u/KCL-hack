"use client";
import {useRouter} from 'next/router'

var name1 = "Player";
var HP1 = 1000;
var attack1 = 600;
var defence1 = 100;
var speed1 = 40;
var name2 = "Rival";
var HP2 = 1000;
var attack2 = 200;
var defence2 = 900;
var speed2 = 40;
var damage1 = attack1 / defence2;
var damage2 = attack2 / defence1;
var strength1 = 500;
var strength2 = 300;

export default function Home() {

  const router = useRouter();
  const roomId = router.query.roomId;


  return (
    <main>
      <h1>Room {roomId}</h1>
      <div className="p-10 text-blue-600 float-left">
        <h2 className="text-4xl p-10">{name1}</h2>
        <h2>HP {HP1}</h2>
        <h2>こうげき {attack1}</h2>
        <h2>ぼうぎょ {defence1}</h2>
        <h2>すばやさ {speed1}</h2>
        <h2>あたえるダメージ {Math.trunc(damage1 * strength1)}</h2>
      </div>
      <div className="p-10 text-red-500 float-right">
        <h2 className="text-4xl p-10">{name2}</h2>
        <h2>HP {HP2}</h2>
        <h2>こうげき {attack2}</h2>
        <h2>ぼうぎょ {defence2}</h2>
        <h2>すばやさ {speed2}</h2>
        <h2>あたえるダメージ {Math.trunc(damage2 * strength2)}</h2>
      </div>
      <div className="text-center p-10">
        <h2>コマンドを選んでください</h2>
      </div>
      <div className="text-center text-3xl">
        <h2>なぐる</h2>
        <h2>ける</h2>
        <h2>にげる</h2>
      </div>
    </main>
  );
}

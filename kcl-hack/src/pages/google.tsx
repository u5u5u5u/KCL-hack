import { useCallback, useEffect, useState } from "react";
import { initializeApp } from "@firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signInWithCredential,
  signOut,
  Auth,
} from "@firebase/auth";
import {
  FIREBASE_APP_ID,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MEASUREMENT_ID,
} from "@/constant/env";
import { firebaseConfig } from "@/lib/firebase/firebase";
//https://console.firebase.google.com/
// プロジェクトを追加
// Authetication -> Sign-in method -> Googleを有効にする
// プロジェクトの概要 -> アプリの追加 -> ウェブ -> アプリの作成
// firebaseConfig の内容を持ってくる

import Header from "../components/header";
import style from "../components/google.module.css";

const useAuth = (auth: Auth) => {
  const [state, setState] = useState<
    "idel" | "progress" | "logined" | "logouted" | "error"
  >("idel");
  const [error, setError] = useState<unknown>("");
  const [credential, setCredential] = useState<UserCredential>();
  const dispatch = useCallback(
    (
      action:
        | { type: "login"; payload?: { token: string } }
        | { type: "logout" }
    ) => {
      setError("");
      switch (action.type) {
        case "login":
          setState("progress");
          const token = action.payload?.token;
          if (token) {
            signInWithCredential(auth, GoogleAuthProvider.credential(token))
              .then((result) => {
                setCredential(result);
                setState("logined");
              })
              .catch((e) => {
                setError(e);
                setState("error");
              });
          } else {
            signInWithPopup(auth, provider)
              .then((result) => {
                setCredential(result);
                setState("logined");
              })
              .catch((e) => {
                setError(e);
                setState("error");
              });
          }
          break;
        case "logout":
          setState("progress");
          signOut(auth)
            .then(() => {
              setCredential(undefined);
              setState("logouted");
            })
            .catch((e) => {
              setError(e);
              setState("error");
            });
          break;
      }
    },
    [auth]
  );
  return { state, error, credential, dispatch };
};

const auth = getAuth(initializeApp(firebaseConfig));
const provider = new GoogleAuthProvider();

const Page = () => {
  const { state, dispatch, credential, error } = useAuth(auth);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch({ type: "login", payload: { token } });
    }
  }, [dispatch]);
  useEffect(() => {
    if (credential) {
      const token =
        GoogleAuthProvider.credentialFromResult(credential)?.idToken;
      token && sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }, [credential]);
  const handleLogin = () => dispatch({ type: "login" });
  const handleLogout = () => dispatch({ type: "logout" });

  return (
    <main>
      <Header children="LOGIN" />
      <div className="container">
        <div className="wrapper">
          <button className={style.button} onClick={handleLogin}>
            logIn
          </button>
          <ul>
            <li className={style.text}>
              UserName: {credential?.user.displayName}
            </li>
            <li className={style.text}>State: {state}</li>
            <li className={style.text}>Error: {String(error)}</li>
          </ul>
          <button className={style.button} onClick={handleLogout}>
            logOut
          </button>
        </div>
      </div>
    </main>
  );
};

export default Page;

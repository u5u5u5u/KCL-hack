import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { firebaseConfig } from "@/lib/firebase/firebase";
import Header from "../../components/header/header";
import style from "../../styles/google.module.css";
import Footer from "../../components/footer/footer";

const useAuth = (auth: Auth) => {
  const [state, setState] = useState<
    "idel" | "progress" | "logined" | "logouted" | "error"
  >("idel");
  const [error, setError] = useState<unknown>("");
  const [credential, setCredential] = useState<UserCredential>();
  const [logined, setLogined] = useState<boolean>(false);

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
                setLogined(true);
              })
              .catch((e) => {
                setError(e);
                setState("error");
                setLogined(false);
              });
          } else {
            signInWithPopup(auth, provider)
              .then((result) => {
                setCredential(result);
                setState("logined");
                setLogined(true);
              })
              .catch((e) => {
                setError(e);
                setState("error");
                setLogined(false);
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
  return { state, error, credential, dispatch, logined };
};

const auth = getAuth(initializeApp(firebaseConfig));

const provider = new GoogleAuthProvider();

const Page = () => {
  const router = useRouter();
  const { state, dispatch, credential, error, logined } = useAuth(auth);
  const [JSvalid, setJSvalid] = useState<boolean>(false);

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

  useEffect(() => {
    if (logined) {
      router.push(`/home`);
    }
  }, [logined]);

  useEffect(() => {
    setJSvalid(true);
  }, []);

  if (JSvalid) {
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
        <Footer />
      </main>
    );
  } else {
    return (
      <main>
        <h1>Please enable javascript</h1>
        <div>
          Hey, bro!! 持ってきな! このログインにはjavascriptが必要なるだろう。
          <br />
          ということで、javascriptをオンにしてください。
        </div>
      </main>
    );
  }
};

export default Page;

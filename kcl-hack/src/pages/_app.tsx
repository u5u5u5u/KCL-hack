import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { initializeFirebaseApp } from "../lib/firebase/firebase";
import { getApp } from "@firebase/app";
import "../styles/globals.css";

initializeFirebaseApp();
export default function App({ Component, pageProps }: AppProps) {
  console.log(getApp());

  return <Component {...pageProps} />;
}

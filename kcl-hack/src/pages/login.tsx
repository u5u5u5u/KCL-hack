"use client";
import Link from "next/link";
import Header from "../components/header";
import Button from "../components/button";

export default function Home() {
  return (
    <main>
      <Header children="login" />
      <div className="container">
        <div>
          <Link href="/google">
            <Button label="signIn" />
          </Link>
        </div>
        <div className="text-center">
          <Link href="/google">
            <Button label="signUp" />
          </Link>
        </div>
      </div>
    </main>
  );
}

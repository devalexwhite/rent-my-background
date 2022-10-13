import Head from "next/head";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "../components/footer";

export default function DefaultLayout({ children }) {
  const [user, setUser] = useState();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Rent my Background!</title>
        <meta
          name="description"
          content="Rent out your Twitch, Teams & Zoom virtual backgrounds!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen min-w-screen">
        <NavBar user={user} />
        <main className="w-full max-w-5xl py-6 mx-auto sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}

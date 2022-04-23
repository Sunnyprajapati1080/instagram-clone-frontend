import "../styles/globals.css";
import Head from "next/head";
import UserState from "../contexts/userContext";
import Router from "next/router";
import cookie from "js-cookie";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (!cookie.get("token")) {
      Router.push("/signup")
    }
  }, [])
  return (
    <UserState>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="this is a full-stack instgram clone with some functionalities as instgram. i built this instagram clone with nextjs and tailwindcss, nodejs and expressjs and mongodb."
        />
        <title>Instagram clone</title>
      </Head>
      <Component {...pageProps} />
    </UserState >
  );
}
export default MyApp;

import Head from "next/head";
import styles from "@/styles/Home.module.css";
import YoutubeVideo from "@/components/YoutubeVideo";

export default function Home() {
  return (
    <>
      <Head>
        <title>Youtube Player</title>
        <meta name="description" content="Youtube watchtime counter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <YoutubeVideo />
      </main>
    </>
  );
}

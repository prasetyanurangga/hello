import "../styles/globals.css";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setLoading(true);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    const handleRouteComplete = (url, { shallow }) => {
      setLoading(false);
    };

    router.events.on("routeChangeComplete", handleRouteComplete);
    return () => {
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Hi👋 I am Angga</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/fav.ico" />
      </Head>
      <main>
        {loading ? (
          <div className="h-screen w-screen flex items-center justify-center">
            <svg
              className="animate-spin h-8 w-8 text-tand-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </main>
    </>
  );
}

export default MyApp;

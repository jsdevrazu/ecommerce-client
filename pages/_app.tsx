import "../styles/globals.css";
import type { AppProps } from "next/app";
import StoreProvider from "../app/store";
import Layout from "../app/Layout";
import { Toaster } from "react-hot-toast";
import "react-modern-drawer/dist/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Toaster />
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </>
  );
}

export default MyApp;

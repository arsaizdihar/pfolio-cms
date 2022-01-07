import { AppProps } from "next/app";
import { PageDataProvider } from "../core/pageData";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageDataProvider data={pageProps.data ?? {}}>
      <Component {...pageProps} />
    </PageDataProvider>
  );
}

export default MyApp;

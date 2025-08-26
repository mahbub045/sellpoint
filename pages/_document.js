import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="icon"
          href="/manifest-icon-192.maskable.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          href="/manifest-icon-512.maskable.png"
          sizes="512x512"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import '@/styles/globals.css';
import { StoreProvider } from '@/utils/Store';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SessionProvider session={pageProps.session}>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
export default App;

import Preloader from '@/components/Preloader';
import '@/styles/globals.css';
import { StoreProvider } from '@/utils/Store';
import { SessionProvider, useSession } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SessionProvider session={pageProps.session}>
        <StoreProvider>
          {Component.auth ? (
            <Auth>
              {loading ? <Preloader /> : <Component {...pageProps} />}
            </Auth>
          ) : (
            loading ? <Preloader /> : <Component {...pageProps} />
          )}
        </StoreProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('unauthorized?message=Login required');
    },
  });
  if (status === 'loading') {
    return <Preloader />
  }
  return children;
}

export default App;

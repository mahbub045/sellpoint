// import '@/styles/globals.css';
// import { StoreProvider } from '@/utils/Store';
// import { SessionProvider } from 'next-auth/react';
// import { ThemeProvider } from 'next-themes';

// function App({ Component, pageProps }) {
//   return (
//     <ThemeProvider attribute="class" defaultTheme="light">
//       <SessionProvider session={pageProps.session}>
//         <StoreProvider>
//           <Component {...pageProps} />
//         </StoreProvider>
//       </SessionProvider>
//     </ThemeProvider>
//   );
// }
// export default App;


import Preloader from '@/components/Preloader';
import '@/styles/globals.css';
import { StoreProvider } from '@/utils/Store';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';

function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulating a 2-second delay, you can adjust this as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SessionProvider session={pageProps.session}>
        <StoreProvider>
          {loading ? <Preloader /> : <Component {...pageProps} />}
        </StoreProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;


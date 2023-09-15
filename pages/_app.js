import '@/styles/globals.css';
import { StoreProvider } from '@/utils/Store';
import { ThemeProvider } from 'next-themes';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </ThemeProvider>
  )
}
export default App;

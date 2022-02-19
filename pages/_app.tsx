import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  // ref: https://github.com/vercel/next.js/discussions/12652
  return <Component {...pageProps} />
}

export default MyApp

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/layout'
import type { GetStaticProps } from 'next'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const boards = await (await fetch(`http://localhost:15555/v1/boards`)).json()
  return {
    props: { boards },
  }
}

export default MyApp

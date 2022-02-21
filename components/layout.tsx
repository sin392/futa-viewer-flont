import { ReactNode, FC } from 'react'

import Header from 'components/header'
import Footer from 'components/footer'
import styles from 'styles/Layout.module.css'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = (props: Props) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </div>
  )
}

export default Layout

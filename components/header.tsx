import { FC } from 'react'
import styles from 'styles/Header.module.css'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>FutaViewer</div>
    </header>
  )
}

export default Header

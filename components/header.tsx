import { FC } from 'react'
import Link from 'next/link'
import styles from 'styles/Header.module.css'

const Header: FC = () => {
  const path = '/threads/img?sort=0'
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={path}>
          <a href={path}>FutaViewer</a>
        </Link>
      </div>
    </header>
  )
}

export default Header

import { FC } from 'react'
import styles from 'styles/ThreadPreview.module.css'

interface Props {
  id: number
  title: string
  resNum: number
  a: {
    href: string
    target: string
  }
  img: {
    src: string
    border: number
    width: number
    height: number
    alt: string
    loading: 'eager' | 'lazy' | undefined
  }
}

const ThreadPreview: FC<Props> = (props: Props) => {
  const { id, title, resNum, a, img } = props
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img {...img} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.resNum}>{resNum}</div>
    </div>
  )
}

export default ThreadPreview

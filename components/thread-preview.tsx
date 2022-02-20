import { FC } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import styles from 'styles/ThreadPreview.module.css'

interface Props {
  id: number
  title: string
  resNum: number
  // href: string
  img: {
    src: string
    width: number
    height: number
    alt: string
  }
}

const ThreadPreview: FC<Props> = (props: Props) => {
  const { title, resNum, img } = props
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <LazyLoadImage {...img} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.resNum}>{resNum}</div>
    </div>
  )
}

export default ThreadPreview

import { ThreadPreviewSchema } from 'entities/threads/catalog'
import { FC } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import styles from 'styles/ThreadPreview.module.css'

interface Props extends ThreadPreviewSchema {}

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

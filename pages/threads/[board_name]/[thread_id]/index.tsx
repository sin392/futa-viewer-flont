import { useRef, useState, UIEvent } from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import styles from 'styles/Thread.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// import Image from 'next/image'
import Comment from 'components/comment'
import { CommentSchema } from 'entities/threads/thread'
import ScrollButton from 'components/scroll-button'
import { swrFetch } from 'utils/utils'

interface Props {
  items: CommentSchema[]
  error?: {
    status: number
    message: string
  }
}

// TODO: replace any
const Thread: NextPage<Props> = () => {
  const router = useRouter()
  const { board_name, thread_id } = router.query
  // ref: https://qiita.com/mktu/items/1d1c0259ed16e9a4155a
  // HACK: 子に渡すのがrefだけだと再描画がはしらず, stateだけだとscrollToが参照できない
  const [scroll, setScroll] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)
  const { data, error, isLoading } = swrFetch(
    `http://localhost:15555/v1/threads/${board_name}/${thread_id}`,
  )
  const items: CommentSchema[] = data ? (data as any).items : []

  const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
    setScroll(e.currentTarget.scrollTop)
  }

  const backHandler = (e: React.MouseEvent) => {
    router.back()
  }

  return (
    <div className={styles.container} onScroll={scrollHandler} ref={ref}>
      <div className={styles.leftContainer}>
        <div className={styles.backButtonContainer}>
          <ArrowBackIcon className={styles.backButton} onClick={backHandler} />
        </div>
      </div>

      <div className={styles.centerContainer}>
        {!error && items.length ? (
          <>
            <div className={styles.topicContainer}>
              {items[0].img && (
                <a href={items[0].href} target='_blank' rel='noopener noreferrer'>
                  <LazyLoadImage
                    src={items[0].img.src}
                    className={styles.image}
                    width={items[0].img.width}
                    height={items[0].img.height}
                  />
                  {/* <div className={styles.image}>
                    <Image
                      src={items[0].img.src}
                      // layout='fill'
                      // objectFit='contain'
                      width={items[0].img.width}
                      height={items[0].img.height}
                    />
                  </div> */}
                </a>
              )}
              <div className={styles.title}>
                <Comment {...items[0]} />
              </div>
            </div>

            <div className={styles.commentArea}>
              {items.slice(1).map((item, index) => {
                return <Comment {...{ ...item, key: index }} />
              })}
            </div>
          </>
        ) : (
          <div className={styles.error}>{error?.message}</div>
        )}
      </div>
      <div className={styles.rightContainer}>
        {!error && (
          <div className={styles.rtbContainer}>
            <ScrollButton className={styles.rtb} scroll={scroll} anchor={ref.current} type='up'>
              <ArrowDropUpIcon className={styles.scrollIcon} />
            </ScrollButton>
            <ScrollButton className={styles.rtb} scroll={scroll} anchor={ref.current} type='down'>
              <ArrowDropDownIcon className={styles.scrollIcon} />
            </ScrollButton>
          </div>
        )}
      </div>
    </div>
  )
}

// TODO: replace any
// export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
//   const board_name = ctx.params.board_name
//   const thread_id = ctx.params.thread_id

//   const res = await fetch(`http://localhost:15555/v1/threads/${board_name}/${thread_id}`)
//   const errorCode = res.ok ? false : res.status
//   const errorMessage = `Error: ${errorCode}`
//   const json = await res.json()
//   const props = !errorCode ? json : { ...json, error: { code: errorCode, message: errorMessage } }

//   return {
//     props: props,
//   }
// }

export default Thread

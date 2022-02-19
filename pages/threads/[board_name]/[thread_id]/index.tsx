import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/layout'
import styles from 'styles/Thread.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Comment from 'components/comment'
// import Link from 'next/link'
interface Props {
  items: {
    order: number
    title: string
    name: string
    date: string
    rate: number
    body: string
    no: string
    srcs: string[]
  }[]
  error?: {
    status: number
    message: string
  }
}

// TODO: replace any
const Thread: NextPage<Props> = (props: Props) => {
  const router = useRouter()
  // const { board_name } = router.query
  const { items, error } = props

  const backHandler = (e: React.MouseEvent) => {
    router.back()
  }

  return (
    <Layout>
      <div className={styles.backButtonContainer}>
        {/* <Link href={''}> */}
        <ArrowBackIcon className={styles.backButton} onClick={backHandler} />
        {/* </Link> */}
      </div>

      <div className={styles.container}>
        {!error ? (
          <div>
            <div className={styles.topicContainer}>
              {items[0].srcs && (
                <a href={items[0].srcs[0]} target='_blank' rel='noopener noreferrer'>
                  <LazyLoadImage src={items[0].srcs[1]} className={styles.image} />
                </a>
              )}
              <div className={styles.title}>
                {/* {parseText(title)} */}
                <Comment
                  {...items[0]}
                  // className={styles.title}
                />
              </div>
            </div>

            <div className={styles.commentArea}>
              {items.slice(1).map((item, index) => {
                return <Comment {...{ ...item, key: index }} />
              })}
            </div>
          </div>
        ) : (
          <div className={styles.error}>{error!.message}</div>
        )}
      </div>
    </Layout>
  )
}

// TODO: replace any
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const board_name = ctx.params.board_name
  const thread_id = ctx.params.thread_id

  const res = await fetch(`http://localhost:15555/v1/threads/${board_name}/${thread_id}`)
  const errorCode = res.ok ? false : res.status
  const errorMessage = `Error: ${errorCode}`
  const json = await res.json()
  const props = !errorCode ? json : { ...json, error: { code: errorCode, message: errorMessage } }
  // const json = await res.json()
  //   .then((data) => {
  //     return data.json()
  //   })
  //   .then((json) => {
  //     return json
  //   })
  //   .catch((error) => {
  //     return { title: '404: Page is not found.', items: [] }
  //   })
  // const res = await (await fetch('http://localhost:15555/v1/threads/dec')).json()

  return {
    props: props,
  }
}

export default Thread

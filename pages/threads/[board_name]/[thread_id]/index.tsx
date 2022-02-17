import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Layout from 'components/layout'
import styles from 'styles/Catalog.module.css'

interface Props {
  // items: object[]
}

// TODO: replace any
const Thread: NextPage<Props> = (props: Props) => {
  // const router = useRouter()
  // const { board_name } = router.query
  // const { items } = props

  return (
    <Layout>
      <div className={styles.container}>thread</div>
    </Layout>
  )
}

// TODO: replace any
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const board_name = ctx.params.board_name
  const thread_id = ctx.params.thread_id
  const res = await (
    await fetch(`http://localhost:15555/v1/threads/${board_name}/${thread_id}`)
  ).json()
  // const res = await (await fetch('http://localhost:15555/v1/threads/dec')).json()
  return {
    props: { items: res },
  }
}

export default Thread

import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from 'components/layout'
import SearchBox from 'components/search-box'
import ThreadPreview from 'components/thread-preview'
import BoardDrawer from 'components/board-drawer'
import styles from 'styles/Catalog.module.css'

interface Props {
  items: object[]
}

// TODO: replace any
const Catalog: NextPage<Props> = (props: Props) => {
  const router = useRouter()
  const { board_name } = router.query
  const { items } = props

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.searchBoxContainer}>
          <SearchBox />
        </div>
        <div className={styles.previews}>
          {items.map((item: any, index) => {
            return <ThreadPreview key={index} {...item} />
          })}
        </div>
        <BoardDrawer />
      </div>
    </Layout>
  )
}

// TODO: replace any
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const board_name = ctx.params.board_name
  const res = await (await fetch(`http://localhost:15555/v1/threads/${board_name}`)).json()
  // const res = await (await fetch('http://localhost:15555/v1/threads/dec')).json()
  return {
    props: { items: res },
  }
}

export default Catalog

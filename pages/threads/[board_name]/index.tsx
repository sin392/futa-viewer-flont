import type { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SearchBox from 'components/search-box'
import ThreadPreview from 'components/thread-preview'
import BoardDrawer from 'components/board-drawer'
import styles from 'styles/Catalog.module.css'
import React, { useEffect, useRef, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ThreadPreviewSchema } from 'entities/threads/catalog'

interface Props {
  items: ThreadPreviewSchema[]
  error?: {
    status: number
    message: string
  }
}

// TODO: replace any
const Catalog: NextPage<Props> = (props: Props) => {
  // ref: https://qiita.com/FumioNonaka/items/feb2fd5b362f2558acfa
  const textRef = useRef<HTMLInputElement>(null!)
  const router = useRouter()
  // TODO: レスポンスの変数名をキャメルケースにしたい
  const { board_name, sort } = router.query
  const { items, error } = props
  const [filteredItems, setFilteredItems] = useState<ThreadPreviewSchema[]>([])
  // const [loading setLoading] = useState<boolean>(false)
  // TODO: コメントまで検索対照に含める
  const searchHandler = () => {
    const keyword = textRef.current.value
    // textRef.current.value = ''
    const tmpFilteredItems = items.filter((item) => {
      if (item.title.includes(keyword)) {
        return item
      }
    })
    if (filteredItems.length !== tmpFilteredItems.length) {
      setFilteredItems(tmpFilteredItems)
    }
  }

  const selectHandler = (e: SelectChangeEvent) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sort: e.target.value },
    })
  }

  useEffect(() => {
    if (router.query.sort == null) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, sort: '0' },
      })
    }
  })

  // TODO: 検索が維持されるようにしたい
  useEffect(() => {
    setFilteredItems(items)
  }, [items])

  return (
    <div className={styles.container}>
      <div className={styles.subHeader}>
        <div className={styles.boardName}>{board_name}</div>
        <div onChange={searchHandler} className={styles.searchBoxContainer}>
          <SearchBox inputRef={textRef} />
        </div>
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            '& MuiOutlinedInput-root': {
              border: 'none !important',
            },
          }}
          className={styles.select}
        >
          <Select defaultValue={'0'} value={(sort as string) || '0'} onChange={selectHandler}>
            <MenuItem value='0'>カタログ</MenuItem>
            <MenuItem value='1'>新順</MenuItem>
            <MenuItem value='2'>古順</MenuItem>
            <MenuItem value='3'>多順</MenuItem>
            <MenuItem value='6'>勢順</MenuItem>
            <MenuItem value='4'>少順</MenuItem>
            <MenuItem value='8'>そ順</MenuItem>
          </Select>
        </FormControl>
      </div>
      {!error ? (
        <>
          <div className={styles.previews}>
            {filteredItems.map((item, index) => {
              if (item.img) {
                item.img.src = item.img.src.replace('cat', 'thumb')
              }
              const path = `/threads/${board_name}/${item.id}`
              return (
                <Link key={index} href={path}>
                  <a href={path}>
                    <ThreadPreview {...item} />
                  </a>
                </Link>
              )
            })}
          </div>
          <BoardDrawer />
        </>
      ) : (
        <div className={styles.error}>{error!.message}</div>
      )}
    </div>
  )
}

// TODO: replace any
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const board_name = ctx.params.board_name
  const sort = ctx.query.sort != null ? ctx.query.sort : '0'
  const query = new URLSearchParams({ sort: sort })
  const res = await fetch(`http://localhost:15555/v1/threads/${board_name}?${query}`)
  const errorCode = res.ok ? false : res.status
  const errorMessage = `Error: ${errorCode}`
  const json = await res.json()
  const props = !errorCode ? json : { ...json, error: { code: errorCode, message: errorMessage } }
  return {
    props: props,
  }
}

export default Catalog

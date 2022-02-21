import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    // エラーオブジェクトに追加情報を付与します。
    error.info = await res.json()
    error.status = res.status
    error.message = `Error: ${res.status}`
    throw error
  }
  return res.json()
}

export const swrFetch = (url: string): { data: object; error: Error; isLoading: boolean } => {
  const { data, error } = useSWR(url, fetcher)

  return {
    data: data,
    error: error,
    isLoading: !error && !data,
  }
}

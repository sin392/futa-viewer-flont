// from: https://qiita.com/TK-C/items/57f8e2283b46655b98f0
import { IconButton } from '@mui/material'
import { FC, useEffect, useState } from 'react'

const LARGE_NUM = 1e5

interface Props {
  scroll: number
  anchor: HTMLDivElement | null
  threshTop?: number
  behavior?: ScrollBehavior
  className?: string
  type?: 'up' | 'down'
}

const scrollButton: FC<Props> = (props) => {
  const [isButtonActive, setIsButtonActive] = useState(false)
  const { scroll, anchor, className, children } = props
  //ボタンを表示させたい位置 (デフォルトでは少しでもスクロールしたら表示)
  const behavior = props.behavior != null ? props.behavior : 'auto'
  const type = props.type != null ? props.type : 'up'
  const threshTop = props.threshTop != null ? props.threshTop : 1
  const bottom = anchor != null ? anchor.scrollHeight - anchor.clientHeight || LARGE_NUM : LARGE_NUM

  const scrollTo = () => {
    anchor?.scrollTo({
      top: type == 'up' ? 0 : bottom,
      behavior: behavior,
    })
  }

  useEffect(() => {
    if (
      (type === 'up' && scroll >= threshTop) ||
      // scrollが少数になりbottomと正確に一致しないので差の絶対値の大きさで判定
      (type === 'down' && Math.abs(scroll - bottom) > 1)
    ) {
      setIsButtonActive(true)
    } else {
      setIsButtonActive(false)
    }
  }, [scroll])

  const style = isButtonActive ? activeStyle : normalStyle

  return (
    <IconButton style={style as any} onClick={scrollTo} className={className}>
      {children}
    </IconButton>
  )
}

const baseStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  userSelect: 'none',
}
const normalStyle = {
  ...baseStyle,
  opacity: 0.5,
  transition: '0.5s',
  pointerEvents: 'none',
}
const activeStyle = {
  ...baseStyle,
  opacity: 1,
  transition: '0.5s',
  cursor: 'pointer',
}

export default scrollButton

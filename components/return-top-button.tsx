// from: https://qiita.com/TK-C/items/57f8e2283b46655b98f0
import { FC, useEffect, useState } from 'react'

interface Props {
  scroll: number
  anchor: HTMLDivElement | null
  top?: number
  behavior?: ScrollBehavior
  className?: string
}

const ReturnTopButton: FC<Props> = (props) => {
  const [isButtonActive, setIsButtonActive] = useState(false)
  const { scroll, anchor, className, children } = props
  //ボタンを表示させたい位置 (デフォルトでは少しでもスクロールしたら表示)
  const top = props.top != null ? props.top : 1
  const behavior = props.behavior != null ? props.behavior : 'auto'

  const returnTop = () => {
    anchor?.scrollTo({
      top: 0,
      behavior: behavior,
    })
  }

  useEffect(() => {
    if (top <= scroll) {
      setIsButtonActive(true)
    } else {
      setIsButtonActive(false)
    }
  }, [scroll])

  const style = isButtonActive ? activeStyle : normalStyle

  return (
    <div style={style as any} onClick={returnTop} className={className}>
      {children}
    </div>
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
  opacity: 0,
  transition: '0.5s',
  pointerEvents: 'none',
}
const activeStyle = {
  ...baseStyle,
  opacity: 1,
  transition: '0.5s',
}

export default ReturnTopButton

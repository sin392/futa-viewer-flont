import { FC } from 'react'
import styles from 'styles/Comment.module.css'

interface Props {
  order: number
  title: string
  name: string
  date: string
  no: string
  body: string
}

// const URLPattern = new RegExp(
//   '(http://|https://){1}[\\w\\-/:\\#\\?\\=\\&\\;\\%\\~\\+\\.]+(?!.*\\.).',
// )

const URLPattern = new RegExp('https://.*')

// 改行ごとにspanで囲む, 引用行ならクラスを付加
// linkは正規表現で判定して, aタグで囲む
const parseText = (text: string): JSX.Element => {
  const wrappedLines = text.split('\n').map((line, index) => {
    const className = line.startsWith('>') ? styles.quoted : undefined
    let elements = (
      <span className={className} key={index}>
        {line}
        <br />
      </span>
    )
    if (URLPattern.test(line)) {
      elements = (
        <a href={line} className={styles.link}>
          {elements}
        </a>
      )
    }
    return elements
  })

  return (
    <>
      {wrappedLines.map((item) => {
        return item
      })}
    </>
  )
}

const Comment: FC<Props> = (props) => {
  const { order, title, name, date, no, body } = props
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <span>{order}</span>
        <span>{title}</span>
        <span>Name</span>
        <span>{name}</span>
        <span>{date}</span>
        <span>{no}</span>
      </div>
      <p className={styles.comment}>{parseText(body)}</p>
    </div>
  )
}

export default Comment

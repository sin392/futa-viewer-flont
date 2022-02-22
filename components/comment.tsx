import { CommentSchema } from 'entities/threads/thread'
import { FC } from 'react'
import styles from 'styles/Comment.module.css'

interface Props extends CommentSchema {}

type CommentAttribute = 'withQuote' | 'withURL' | 'isolated' | 'deleted' | 'popular'

export const DELETED_COMMENT = '書き込みをした人によって削除されました'
export const ISOLATED_COMMENT = '削除依頼によって隔離されました'

export const URL_REG_EXP = new RegExp(
  '(http://|https://){1}[\\w\\-/:\\#\\?\\=\\&\\;\\%\\~\\+\\.]+(?!.*\\.).',
)

// 改行ごとにspanで囲む, 引用行ならクラスを付加
// linkは正規表現で判定して, aタグで囲む
const parseComment = (
  text: string,
  sod: number = 0,
  sodThresh: number = 1,
): [JSX.Element, string[]] => {
  // TODO: replace string with CommentAttribute
  let commentAttributes: string[] = []
  const wrappedLines = text.split('\n').map((line, index) => {
    let className = undefined
    if (line.startsWith('>')) {
      className = styles.quotedLine
      commentAttributes.push(styles['withQuote'])
    } else if (line === DELETED_COMMENT) {
      className = styles.deletedLine
      commentAttributes.push(styles['deleted'])
    } else if (line === ISOLATED_COMMENT) {
      className = styles.isolatedLine
      commentAttributes.push(styles['isolated'])
    }

    let elements = (
      <span className={className} key={index}>
        {line}
        <br />
      </span>
    )
    if (!className && URL_REG_EXP.test(line)) {
      elements = (
        <a href={line} className={styles.linkLine} key={index}>
          {elements}
        </a>
      )
      commentAttributes.push(styles['withURL'])
    }
    if (sod >= sodThresh) {
      commentAttributes.push(styles['popular'])
    }

    return elements
  })

  const commentElement: JSX.Element = (
    <>
      {wrappedLines.map((item) => {
        return item
      })}
    </>
  )
  return [commentElement, commentAttributes]
}

const Comment: FC<Props> = (props) => {
  const { order, title, name, date, no, sod, body } = props
  const [commentElement, commentAttributes] = parseComment(body, sod, 1)
  return (
    <div className={`${styles.commentContainer} ${commentAttributes.join(' ')}`}>
      <div className={styles.commentHeader}>
        <span>{order}</span>
        {title && <span>{title}</span>}
        {name && (
          <>
            <span>Name</span>
            <span>{name}</span>
          </>
        )}
        <span>{date}</span>
        <span>{no}</span>
        {sod != null && <span>{sod === 0 ? '+' : `そうだねx${sod}`}</span>}
      </div>
      <p className={styles.comment}>{commentElement}</p>
    </div>
  )
}

export default Comment

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
export const UP2FILE_REG_EXP = new RegExp(
  'fu[0-9]+.[3g2|3gp|7z|ai|aif|asf|avi|bmp|c|doc|eps|exe|f4v|flv|gca|gif|htm|html|jpeg|jpg|lzh|m4a|mgx|mht|mid|mkv|mmf|mov|mp3|mp4|mpeg|mpg|mpo|mqo|ogg|pdf|pls|png|ppt|psd|ram|rar|rm|rpy|sai|swf|tif|tiff|txt|wav|webm|webp|wma|wmv|xls|zip]{1}',
)

// TODO: あぷ小、ダイスへの対応
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
    if (!className) {
      if (URL_REG_EXP.test(line)) {
        elements = (
          <a
            href={line}
            className={styles.linkLine}
            key={index}
            target='_blank'
            rel='noopener noreferrer'
          >
            {elements}
          </a>
        )
        commentAttributes.push(styles['withURL'])
      } else if (UP2FILE_REG_EXP.test(line)) {
        elements = (
          <a
            href={`http://dec.2chan.net/up2/src/${line}`}
            className={styles.linkLine}
            key={index}
            target='_blank'
            rel='noopener noreferrer'
          >
            {elements}
          </a>
        )
        commentAttributes.push(styles['withURL'])
      }
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

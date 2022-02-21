import { ImageSchema } from './image'

export interface CommentSchema {
  order: number
  title: string
  name: string
  date: string
  no: string
  sod?: string
  body: string
  img?: ImageSchema
}

export interface ThreadSchema {
  items: CommentSchema[]
}

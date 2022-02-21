import { ImageSchema } from './image'

export interface ThreadPreviewSchema {
  id: number
  title: string
  resNum: number
  img?: ImageSchema
}

export interface CatalogSchema {
  items: ThreadPreviewSchema[]
}

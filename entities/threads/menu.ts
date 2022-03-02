export interface BoardSchema {
  name: string
  href: string
}

export interface MenuSchema {
  items: BoardSchema[]
}

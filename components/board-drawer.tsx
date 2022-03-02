import React, { FC, useState } from 'react'
import Link from 'next/link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import styles from 'styles/BoardDrawer.module.css'
import { MenuSchema } from 'entities/threads/menu'

const drawerWidth = 220

interface Props {
  boards: MenuSchema
}

const BoardDrawer: FC<Props> = ({ boards }) => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (open: boolean) => (e: any) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }

    setOpen(open)
  }

  return (
    <div className={styles.container}>
      <div onClick={toggleDrawer(true)} className={styles.button}></div>
      <SwipeableDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          // '& .PrivateSwipeArea-root': {
          //   zIndex: '0 !important',
          // },
        }}
        variant='temporary'
        anchor='left'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List>
          {boards &&
            boards.items.map((item, index) => (
              <Link key={index} href={`/threads/${item.name}`} passHref>
                <ListItem button component='a'>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            ))}
        </List>
      </SwipeableDrawer>
    </div>
  )
}

export default BoardDrawer

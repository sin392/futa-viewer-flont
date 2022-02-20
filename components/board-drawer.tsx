import React, { FC, useState } from 'react'
import Link from 'next/link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import styles from 'styles/BoardDrawer.module.css'

const drawerWidth = 180

const BoardDrawer: FC = () => {
  const [open, setOpen] = useState(false)

  // const handleDrawerToggle = () => {
  //   setOpen(!open)
  // }

  const toggleDrawer = (open: boolean) => (e: any) => {
    if (e && e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }
    console.log(open)
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
          '& .PrivateSwipeableArea-root': {
            zIndex: 0,
          },
        }}
        anchor='left'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className={styles.subContainer}>
          <div className={styles.listContainer}>
            <List>
              {['img', 'may', 'dec'].map((text, index) => (
                <Link key={text} href={`/threads/${text}`} passHref>
                  <ListItem button component='a'>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  )
}

export default BoardDrawer

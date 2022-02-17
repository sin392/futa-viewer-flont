import { FC, useState } from 'react'
import Link from 'next/link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import Drawer from '@mui/material/Drawer'
import styles from 'styles/BoardDrawer.module.css'

const drawerWidth = 180

const BoardDrawer: FC = () => {
  const [open, setOpen] = useState(false)

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <div className={styles.container}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        // variant='permanent'
        anchor='left'
        open={open}
      >
        <div className={styles.subContainer}>
          <div className={styles.listContainer}>
            <List>
              {['img', 'may', 'dec'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={<Link href={`/threads/${text}`}>{text}</Link>} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={styles.buttonContainer} onClick={handleDrawerToggle}>
            {/* <div onClick={handleDrawerToggle} className={styles.button}></div> */}
          </div>
        </div>
      </Drawer>
      <div onClick={handleDrawerToggle} className={styles.button}></div>
    </div>
  )
}

export default BoardDrawer
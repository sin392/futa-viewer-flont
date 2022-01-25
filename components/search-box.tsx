import { FC, useState } from 'react'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

import styles from 'styles/SearchBox.module.css'

const SearchBox: FC = () => {
  return (
    <div className={styles.container}>
      <TextField
        placeholder='キーワードで検索'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        className={styles.textField}
      />
    </div>
  )
}

export default SearchBox

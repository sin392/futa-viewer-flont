import { FC } from 'react'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

import styles from 'styles/SearchBox.module.css'

interface Props {
  inputRef: any
}

const SearchBox: FC<Props> = ({ inputRef }) => {
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
        inputRef={inputRef}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none !important',
          },
        }}
        // className={styles.textField}
      />
    </div>
  )
}

export default SearchBox

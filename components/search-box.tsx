import { FC } from 'react'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'

import styles from 'styles/SearchBox.module.css'

// 基本はCSS Modulesでやりたいので最低限のスタイル設定だけ...
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none !important',
  },
})

const SearchBox: FC = () => {
  return (
    <div className={styles.container}>
      <StyledTextField
        placeholder='キーワードで検索'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        // className={styles.textField}
      />
    </div>
  )
}

export default SearchBox

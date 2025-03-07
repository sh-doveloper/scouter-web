// material-ui
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';

// assets
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import InputLabel from '@mui/material/InputLabel';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

export default function Search() {
  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: '100%', md: 224 }, height: 41 }} vairent="outlined">
        <InputLabel htmlFor="header-search">키워드</InputLabel>
        <OutlinedInput
          size="small"
          id="header-search"
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          label="키워드"
          sx={{ height: 41, alignItems: 'center' }}
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'weight'
          }}
          // placeholder="키워드"
        />
      </FormControl>
    </Box>
  );
}

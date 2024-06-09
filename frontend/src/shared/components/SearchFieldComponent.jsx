import { Search } from '@mui/icons-material';
import { Button, Grid, TextField, Typography, IconButton, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { setToGloalSearch } from '../../store';
import { useDispatch } from 'react-redux';

const formFields = {
  toSearch: '',
};

export const SearchFieldComponent = ({ onSubmit, customPlaceholder = '', fetching = false }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  const onClick = (event) => {
    event.preventDefault();
    dispatch(setToGloalSearch(value));
    onSubmit(value);
  };

  useEffect(() => {
    setIsFetching(fetching);
  }, [fetching]);

  return (
    <Grid
      item
      className="box-shadow"
      xs={10}
      backgroundColor="yell"
      sx={{
        width: {
          sm: 600,
          //sm: 450,
          //md: 600,
          //lg: 800
        },
        padding: 0,
        borderRadius: 0,
      }}
    >
      <form onSubmit={onClick}>
        <Grid container backgroundColor="re" minWidth={'300px'}>
          <Grid item xs={12} sx={{ mt: 2 }} sm={10} backgroundColor="">
            <TextField
              label="Buscar"
              type="text"
              placeholder={customPlaceholder}
              fullWidth
              name="value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2.1 }} sm={2}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={value == '' || isFetching}
              sx={{ height: { xs: 40, sm: 55 }, width: { xs: 'full', sm: 50 } }}
            >
              {isFetching ? <CircularProgress size={25} /> : <Search />}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

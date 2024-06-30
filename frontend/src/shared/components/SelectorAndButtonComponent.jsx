import { Search } from '@mui/icons-material';
import {
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { setToGloalSearch } from '../../store';
import { useDispatch } from 'react-redux';

export const SelectorAndButtonComponent = ({
  onSubmit,
  options = [],
  customPlaceholder = '',
  fetching = false,
  inputLabel = 'Buscar',
}) => {
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
          <Grid item xs={10} sm={10} sx={{ mt: 2 }} backgroundColor="">
            <FormControl fullWidth>
              <Select
                //size="small"
                id="value"
                value={value}
                name="value"
                onChange={(event) => setValue(event.target.value)}
                required
              >
                {options.map((data, count) => {
                  return (
                    <MenuItem key={data.id ?? count} value={data.id ?? data}>
                      {data.name ?? data}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2} sm={2} sx={{ mt: 2.1 }}>
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

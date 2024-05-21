import { Cancel, CancelOutlined, Check, DragHandleRounded } from '@mui/icons-material';
import { Button, Grid, TextField, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';

export const LevelNewComponent = ({ isFetching = false, handleCreate }) =>{
  const [openCreate, setOpenCreate] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue('')
  }, [openCreate]);

  const onClickAction = (event) => {
    event.preventDefault();
    setOpenCreate(false)
    handleCreate(
        {
            levelName: value,
        }
    );
  };
  return (
    <Grid paddingTop={1}>
      <Grid container paddingBottom={1}>
        {openCreate ? (
          <form onSubmit={onClickAction}>
            <Grid container>
              <Grid width={185}>
                <TextField
                  label='Nuevo nivel'
                  size="small"
                  type="text"
                  placeholder='Escribe el nivel'
                  fullWidth
                  name="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
              </Grid>

              <Grid paddingLeft={1}>
                <Tooltip title="Guardar">
                            <IconButton
                                type="submit"
                                sx={{
                                color: 'primary.main',
                                ':hover': {
                                    color: 'white',
                                    backgroundColor: 'primary.main',
                                    opacity: 10,
                                },
                                }}
                                onClick={()=>onClickAction}
                            >
                                <Check color="primary.main" />
                            </IconButton>
                </Tooltip>
                <Tooltip title="Cancelar">
                  <IconButton onClick={() => setOpenCreate(false)}>
                    <Cancel />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Button variant="contained" onClick={()=>setOpenCreate(true)}>
        Crear Nivel
      </Button>
        )}

       
      </Grid>
    </Grid>
  );
}
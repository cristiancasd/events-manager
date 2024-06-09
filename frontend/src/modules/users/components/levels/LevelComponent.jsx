import { Cancel, CancelOutlined, Check, DeleteOutline, DragHandleRounded } from '@mui/icons-material';
import { Button, Grid, TextField, IconButton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { variableStatus } from '../../../../shared';
import { useSelector } from 'react-redux';

export const LevelComponent = ({ level, isFetching = false, handleEdit, handleDelete, handleShowTableByLevel }) => {
  const { usersStatus } = useSelector((state) => state.users);

  const [openEdit, setOpenEdit] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(level.name ?? '');
  }, [openEdit]);

  const onClickAction = (event) => {
    event.preventDefault();
    setOpenEdit(false);

    handleEdit({
      id: level.id,
      levelName: value,
    });
  };
  return (
    <Grid paddingTop={1}>
      <Grid container paddingBottom={1} key={level.id}>
        {openEdit ? (
          <form onSubmit={onClickAction}>
            <Grid container>
              <Grid width={185}>
                <TextField
                  size="small"
                  type="text"
                  placeholder="Escribe el nivel"
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
                    onClick={() => onClickAction}
                  >
                    <Check color="primary.main" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancelar">
                  <IconButton onClick={() => setOpenEdit(false)}>
                    <Cancel />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton onClick={() => handleDelete(level.id)}>
                    <DeleteOutline />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </form>
        ) : (
          <Grid width={180} backgroundColor="yello">
            {level.name}
          </Grid>
        )}

        {!openEdit && (
          <Button variant="outlined" size="small" onClick={() => setOpenEdit(true)}>
            Editar
          </Button>
        )}

        <Grid paddingLeft={2}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleShowTableByLevel(level.id)}
            disabled={usersStatus.users == variableStatus.fetching}
          >
            ver tabla
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

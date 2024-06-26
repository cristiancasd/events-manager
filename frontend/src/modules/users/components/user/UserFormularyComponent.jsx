import { Button, Grid, TextField, Typography, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

import { useForm, userStatus } from '../../../../shared';
import { useState } from 'react';
import { getLevelNameById } from '../../../../store';

const emptyUser = {
  userName: '',
  email: '',
  phone: '',
  document: '',
  role: userStatus.user,
  levelUid: '',
  commerceUserId: '',
};

export const UserFourmularyComponent = ({ onSubmit, actionName, user, disabledRole }) => {
  const { levels } = useSelector((state) => state.levels);

  const [userFormField, setUserFormField] = useState(user ?? emptyUser);

  const { userName, email, phone, document, role, commerceUserId, levelUid, onInputChange, formState } =
    useForm(userFormField);

  const basicSubmit = async (event) => {
    event.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={basicSubmit}>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Nombre"
            size="small"
            type="text"
            placeholder="Escribe valor venta"
            fullWidth
            name="userName"
            value={userName}
            onChange={onInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Correo electrónico"
            size="small"
            type="email"
            placeholder="Escribe valor preventa"
            name="email"
            value={email}
            onChange={onInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }} paddingRight={1}>
          <TextField
            label="Celular"
            size="small"
            type="text"
            placeholder="Escribe num. de celular"
            fullWidth
            name="phone"
            value={phone}
            onChange={onInputChange}
            required
          />
        </Grid>
        <Grid item xs={6} sx={{ mt: 2 }} paddingLeft={1}>
          <TextField
            label="Cédula"
            size="small"
            type="text"
            placeholder="Escribe la cédula"
            fullWidth
            name="document"
            value={document}
            onChange={onInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Código ID"
            size="small"
            type="text"
            placeholder="Escribe el ID"
            fullWidth
            name="commerceUserId"
            value={commerceUserId}
            onChange={onInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="role_">Nivel</InputLabel>
            <Select
              labelId="nivel"
              size="small"
              id="levelUid"
              value={levelUid}
              name="levelUid"
              label="levelUid"
              onChange={onInputChange}
              required
            >
              {levels.map((data) => (
                <MenuItem key={data.id} value={data.id}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="role_">Roles</InputLabel>
            <Select
              labelId="role"
              size="small"
              id="role"
              value={role}
              name="role"
              label="role"
              onChange={onInputChange}
              required
              disabled={disabledRole ?? false}
            >
              <MenuItem key={userStatus.user} value={userStatus.user}>
                Usuario
              </MenuItem>
              <MenuItem key={userStatus.admin} value={userStatus.admin}>
                Administrador
              </MenuItem>
              <MenuItem key={userStatus.superAdmin} value={userStatus.superAdmin}>
                Super Administrador
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} sm={12}>
            <Button type="submit" variant="contained" fullWidth>
              {actionName}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

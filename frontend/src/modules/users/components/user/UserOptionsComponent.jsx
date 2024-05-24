import { Button, Grid, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useForm } from '../../../../shared';
import { useState } from 'react';
import { getLevelNameById } from '../../../../store';

const emptyUser = {
  userName: '',
  email: '',
  phone: '',
  document: '',
  role: '',
  levelUid: '',
};

export const UserOptionsComponent = ({ onEditUser, onAddTicket, user }) => {

  const { levels } = useSelector((state) => state.levels);


  const { name, email, phone, document, commerceUserId, role, levelUid, } = user;


  const lineText = (texto1, texto2) =>
    <Typography><span style={{ fontWeight: 'bold' }}>{texto1}:</span> {texto2}</Typography>


  return (
      <Grid container>
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          {lineText('Nombre', name)}
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          {lineText('Nivel', getLevelNameById(levelUid, levels))}
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          {lineText('Correo', email)}

        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          {lineText('Celular', phone)}
        </Grid>

        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          {lineText('Cedula', document)}
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: 2 }}>
          {lineText('ID', commerceUserId)}

        </Grid>



        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={6} >
            <Button onClick={onEditUser} variant="outlined" fullWidth>
              Editar
            </Button>
          </Grid>

          <Grid item xs={6} >
            <Button onClick={onAddTicket} variant="contained" fullWidth>
              + Ticket
            </Button>
          </Grid>
        </Grid>
      </Grid>
  );
};

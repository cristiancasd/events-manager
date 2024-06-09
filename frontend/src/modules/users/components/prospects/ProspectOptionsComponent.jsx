import { Button, Grid, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { prospectTypes, useForm } from '../../../../shared';
import { getLevelNameById, startFindUserByUid } from '../../../../store';
import { Add, Edit } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export const ProspectOptionsComponent = ({ onEditProspect, prospect }) => {
  const { user: userPatrocinador } = useSelector((state) => state.users);
  const { name = '', phone = '', type = '' } = prospect;

  const dispatch = useDispatch();

  useEffect(() => {
    if (prospect) {
      dispatch(startFindUserByUid(prospect?.userCommerceUid));
    }
  }, []);

  const lineText = (texto1, texto2) => (
    <Typography>
      <span style={{ fontWeight: 'bold' }}>{texto1}:</span> {texto2}
    </Typography>
  );

  return (
    <Grid container>
      <Grid item xs={12} md={6} sx={{ mt: 2 }}>
        {lineText('Nombre', name)}
      </Grid>

      <Grid item xs={12} md={6} sx={{ mt: 2 }}>
        {lineText('Celular', phone)}
      </Grid>

      <Grid item xs={12} md={6} sx={{ mt: 2 }}>
        {lineText('Tipo', type ? (type == prospectTypes.prospect ? 'Prospecto' : 'Prospecto VIP') : '')}
      </Grid>

      <Grid item xs={12} md={6} sx={{ mt: 2 }}>
        {lineText('Patrocinador', userPatrocinador?.name ?? '')}
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
        <Grid item xs={12}>
          <Button onClick={onEditProspect} variant="contained" fullWidth>
            <Edit /> Prospecto
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

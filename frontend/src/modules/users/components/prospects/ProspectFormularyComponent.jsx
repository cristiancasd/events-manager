import { Button, Grid, TextField, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useForm, prospectTypes } from '../../../../shared';
import { useEffect, useState } from 'react';
import { Edit, Search } from '@mui/icons-material';
import { resetUsersVariables, startFindUserByDocOrId, startFindUserByUid } from '../../../../store';

const emptyProspect = {
  prospectName: '',
  type: '',
  phone: '',
  patrocinador: '',
};

export const ProspectFourmularyComponent = ({ onSubmit, actionName, prospect }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetUsersVariables());
    if (prospect) {
      dispatch(startFindUserByUid(prospect?.userCommerceUid));
    }
  }, []);

  const { user } = useSelector((state) => state.auth);
  const { user: userPatrocinador } = useSelector((state) => state.users);

  const { toGlobalSearch } = useSelector((state) => state.common);

  const [prospectFormField, setProspectFormField] = useState(
    prospect ? { ...prospect, patrocinador: '' } : { ...emptyProspect, phone: toGlobalSearch ?? '' }
  );

  const { prospectName, type, phone, patrocinador, onInputChange, formState } = useForm(prospectFormField);

  const basicSubmit = async (event) => {
    event.preventDefault();
    onSubmit({
      ...formState,
      name: prospectName,
      userCommerceUid: userPatrocinador.id,
    });
  };

  const lineText = (texto1, texto2 = '') => (
    <Grid alignSelf={'center'}>
      <Typography>
        <span style={{ fontWeight: '', fontSize: 14 }}>{texto1}:</span> {texto2}
      </Typography>
    </Grid>
  );

  const handleFindUser = () => {
    dispatch(
      startFindUserByDocOrId({
        commerceUid: user.commerceUid,
        toSearch: patrocinador,
      })
    );
  };

  return (
    <form onSubmit={basicSubmit}>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Grid justifyItems={'center'} width={110}>
            {lineText('Nombre')}
          </Grid>
          <TextField
            size="small"
            type="text"
            placeholder="Escribe el nombre"
            fullWidth
            name="prospectName"
            value={prospectName}
            onChange={onInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Grid justifyItems={'center'} width={110}>
            {lineText('Celular')}
          </Grid>
          <TextField
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

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Grid justifyItems={'center'} width={110}>
            {lineText('Patrocinador')}
          </Grid>

          {userPatrocinador ? (
            <Grid container>
              {lineText('Nombre', userPatrocinador.name)}
              <Button sx={{ marginLeft: 0 }} onClick={() => dispatch(resetUsersVariables())} variant="outline">
                <Edit />
              </Button>
            </Grid>
          ) : (
            <Grid container>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  placeholder="Escribe ID o documento del patrocinador"
                  name="patrocinador"
                  value={patrocinador}
                  onChange={onInputChange}
                  required
                />
              </Grid>
              <Grid item xs={1}>
                <Button disabled={patrocinador == ''} onClick={handleFindUser} variant="outlined">
                  <Search />
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Grid justifyItems={'center'} width={110} paddingBottom={0}>
            {lineText('Tipo')}
          </Grid>
          <FormControl fullWidth>
            <Select size="small" id="type" value={type} name="type" onChange={onInputChange} required>
              <MenuItem key={prospectTypes.prospect} value={prospectTypes.prospect}>
                Prospecto
              </MenuItem>
              <MenuItem key={prospectTypes.prospectVip} value={prospectTypes.prospectVip}>
                Prospecto VIP
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} sm={12}>
            <Button
              disabled={!userPatrocinador || prospectName == '' || type == ''}
              type="submit"
              variant="contained"
              fullWidth
            >
              {actionName}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

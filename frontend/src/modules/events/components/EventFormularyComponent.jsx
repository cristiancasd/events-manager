import { Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from '../../../shared';

const eventFormField = {
  eventName: 'pepe',
  date: '',
  description: 'pepe2',
  url: '',
};

export const EventFourmularyComponent = ({ onSubmit, actionName,  event}) => {


  const { eventName, date, description, url, onInputChange, formState, commerceUid } = useForm(event??eventFormField);

  const basicSubmit = async (event) => {
    event.preventDefault();
    onSubmit(formState);
  };

  const today = new Date().toISOString().split('T')[0];


  return (<form onSubmit={basicSubmit}>
    <Grid container>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <TextField
          label="Nombre del Evento"
          type="text"
          placeholder="Nombre del evento"
          fullWidth
          name="eventName"
          value={eventName}
          onChange={onInputChange}
          required
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <TextField
          type="date"
          name="date"
          value={date}
          onChange={onInputChange}
          inputProps={{ min: today }}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <TextField
          label="Descripción"
          type="text"
          placeholder="Describe el evento"
          name="description"
          value={description}
          onChange={onInputChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} sx={{ mt: 2 }}>
        <TextField
          label="URL"
          type="text"
          placeholder="Copia una URL"
          name="url"
          value={url}
          onChange={onInputChange}
          fullWidth
        />
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
        <Grid item xs={12} sm={12}>
          <Button type="submit" variant="contained" fullWidth>
            {actionName}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </form>)
}
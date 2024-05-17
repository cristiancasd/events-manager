import { Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from '../../../../shared';
import { useState } from 'react';

const emptyTicket = {
  presaleFee: '',
  saleFee: '',
};

export const TicketFourmularyComponent = ({ onSubmit, actionName, ticket }) => {
  const [ticketFormField, setTicketFormField] = useState(ticket ?? emptyTicket);

  const { saleFee, presaleFee, onInputChange, formState } = useForm(ticketFormField);

  const basicSubmit = async (event) => {
    event.preventDefault();
    onSubmit(formState);
  };

  return (
    <form onSubmit={basicSubmit}>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Precio venta"
            type="text"
            placeholder="Escribe valor venta"
            fullWidth
            name="saleFee"
            value={saleFee}
            onChange={onInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Precio preventa"
            type="text"
            placeholder="Escribe valor preventa"
            name="presaleFee"
            value={presaleFee}
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
    </form>
  );
};
